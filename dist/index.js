"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const io_1 = require("@actions/io");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
main().catch((error) => (0, core_1.setFailed)(error.message));
async function main() {
    try {
        const path = (0, core_1.getInput)("path", { required: true });
        let contents = (0, core_1.getInput)("contents", { required: true });
        const mode = ((0, core_1.getInput)("write-mode") || "append").toLocaleLowerCase();
        const emptyLineEOF = (0, core_1.getInput)("empty-line-eof") || false;
        // Ensure the correct mode is specified
        if (mode !== "append" && mode !== "overwrite" && mode !== "preserve") {
            (0, core_1.setFailed)("Mode must be one of: overwrite, append, or preserve");
            return;
        }
        // Preserve the file
        if (mode === "preserve" && (0, fs_1.existsSync)(path)) {
            const statResult = await (0, promises_1.stat)(path);
            (0, core_1.setOutput)("size", `${statResult.size}`);
            return;
        }
        const targetDir = (0, path_1.dirname)(path);
        await (0, io_1.mkdirP)(targetDir);
        // Add an empty line at the end of the file
        if (emptyLineEOF) {
            contents += '\n';
        }
        if (mode === "overwrite") {
            await (0, promises_1.writeFile)(path, contents);
        }
        else {
            await (0, promises_1.appendFile)(path, contents);
        }
        const statResult = await (0, promises_1.stat)(path);
        (0, core_1.setOutput)("size", `${statResult.size}`);
    }
    catch (error) {
        (0, core_1.setFailed)(error.message);
    }
}
