import { getInput, setFailed, setOutput } from "@actions/core";
import { mkdirP } from "@actions/io";
import { appendFile, exists, writeFile, stat } from "fs";
import { dirname, join as joinPath, resolve as resolvePath } from "path";
import { promisify } from "util";

const appendFileAsync = promisify(appendFile);
const existsAsync = promisify(exists);
const writeFileAsync = promisify(writeFile);
const statAsync = promisify(stat);

main().catch((error) => setFailed(error.message));

async function main() {
  try {
    const path = getInput("path", { required: true });
    let contents = getInput("contents", { required: true });
    const mode = (getInput("write-mode") || "append").toLocaleLowerCase();
    const emptyLineEOF = getInput("empty-line-eof") || false;

    // Ensure the correct mode is specified
    if (mode !== "append" && mode !== "overwrite" && mode !== "preserve") {
      setFailed("Mode must be one of: overwrite, append, or preserve");
      return;
    }

    // Preserve the file
    if (mode === "preserve" && (await existsAsync(path))) {
      const statResult = await statAsync(path);
      setOutput("size", `${statResult.size}`);
      return;
    }

    const targetDir = dirname(path);

    await mkdirP(targetDir);

    // Add an empty line at the end of the file
    if (emptyLineEOF) {
      contents += '\n'
    }

    if (mode === "overwrite") {
      await writeFileAsync(path, contents);
    } else {
      await appendFileAsync(path, contents);
    }

    const statResult = await statAsync(path);
    setOutput("size", `${statResult.size}`);
  } catch (error) {
    setFailed(error.message);
  }
}
