"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomingFile = void 0;
const Configuration_1 = require("./Configuration");
const path_1 = require("path");
const fs_1 = require("fs");
const multer = require("multer");
const multer_1 = require("multer");
const Logger_1 = require("./Logger");
class FileHandler {
    constructor(fieldName) {
        this.uploadPath = (0, path_1.join)(Configuration_1.configuration.getBasePath(), Configuration_1.environment.UPLOAD_PATH);
        this.requestHandler = multer({
            storage: this.getStorageEngine(),
        }).single(fieldName);
    }
    getRequestHandler() {
        return this.requestHandler;
    }
    getPathResolver() {
        return (req, file, destination) => {
            const dynamicPath = (0, path_1.join)(this.uploadPath, Date.now().toString());
            (0, fs_1.mkdir)(dynamicPath, { recursive: true }, (err) => {
                err ? Logger_1.logger.info(err) : destination(null, dynamicPath);
            });
        };
    }
    getStorageEngine() {
        return (0, multer_1.diskStorage)({
            destination: this.getPathResolver(),
        });
    }
}
const incomingFile = (fieldName) => {
    return new FileHandler(fieldName).getRequestHandler();
};
exports.incomingFile = incomingFile;
//# sourceMappingURL=FileHandler.js.map