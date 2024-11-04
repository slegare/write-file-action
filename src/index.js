"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@actions/core");
var io_1 = require("@actions/io");
var fs_1 = require("fs");
var promises_1 = require("fs/promises");
var path_1 = require("path");
main().catch(function (error) { return (0, core_1.setFailed)(error.message); });
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var path, contents, mode, emptyLineEOF, statResult_1, targetDir, statResult, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    path = (0, core_1.getInput)("path", { required: true });
                    contents = (0, core_1.getInput)("contents", { required: true });
                    mode = ((0, core_1.getInput)("write-mode") || "append").toLocaleLowerCase();
                    emptyLineEOF = (0, core_1.getInput)("empty-line-eof") || false;
                    // Ensure the correct mode is specified
                    if (mode !== "append" && mode !== "overwrite" && mode !== "preserve") {
                        (0, core_1.setFailed)("Mode must be one of: overwrite, append, or preserve");
                        return [2 /*return*/];
                    }
                    if (!(mode === "preserve" && (0, fs_1.existsSync)(path))) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, promises_1.stat)(path)];
                case 1:
                    statResult_1 = _a.sent();
                    (0, core_1.setOutput)("size", "".concat(statResult_1.size));
                    return [2 /*return*/];
                case 2:
                    targetDir = (0, path_1.dirname)(path);
                    return [4 /*yield*/, (0, io_1.mkdirP)(targetDir)];
                case 3:
                    _a.sent();
                    // Add an empty line at the end of the file
                    if (emptyLineEOF) {
                        contents += '\n';
                    }
                    if (!(mode === "overwrite")) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, promises_1.writeFile)(path, contents)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, (0, promises_1.appendFile)(path, contents)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [4 /*yield*/, (0, promises_1.stat)(path)];
                case 8:
                    statResult = _a.sent();
                    (0, core_1.setOutput)("size", "".concat(statResult.size));
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    (0, core_1.setFailed)(error_1.message);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
