import { getInput, setFailed, setOutput } from "@actions/core";
import { mkdirP } from "@actions/io";
import { existsSync } from "fs";
import { appendFile, stat, writeFile } from "fs/promises";
import { dirname } from "path";

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
    if (mode === "preserve" && existsSync(path)) {
      const statResult = await stat(path);
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
      await writeFile(path, contents);
    } else {
      await appendFile(path, contents);
    }

    const statResult = await stat(path);
    setOutput("size", `${statResult.size}`);
  } catch (error) {
    setFailed(((error as unknown) as Error).message);
  }
}
