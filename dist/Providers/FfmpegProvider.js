"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegProvider = void 0;
const child_process_1 = require("child_process");
class StringBuilder {
    constructor() {
        this.elements = [];
    }
    append(str) {
        this.elements.push(str);
    }
    toString() {
        return this.elements.join(' ');
    }
}
class FfmpegProvider {
    constructor(inputFile) {
        this.inputFile = inputFile;
        this.queryBuilder = new StringBuilder();
        this.queryBuilder.append(`ffmpeg -i ${this.inputFile}`);
    }
    formatTo(value) {
        this.queryBuilder.append(`-f ${value}`);
        return this;
    }
    bitRate(kiloHertz) {
        this.queryBuilder.append(`-ar ${kiloHertz * 1000}`);
        return this;
    }
    channels(value) {
        this.queryBuilder.append(`-ac ${value}`);
        return this;
    }
    segmentTime(value) {
        this.queryBuilder.append(`-segment_time ${value}`);
        return this;
    }
    outDir(absolutePath) {
        this.queryBuilder.append(absolutePath);
        return this;
    }
    outDirCopy(absolutePath) {
        this.queryBuilder.append(`-c copy ${absolutePath}`);
        return this;
    }
    execSync() {
        this.queryBuilder.append('-loglevel quiet');
        return (0, child_process_1.execSync)(this.queryBuilder.toString());
    }
}
exports.FfmpegProvider = FfmpegProvider;
//# sourceMappingURL=FfmpegProvider.js.map