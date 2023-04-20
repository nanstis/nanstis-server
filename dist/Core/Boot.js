"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const express = require("express");
const Configuration_1 = require("./Configuration");
const cors = require("cors");
const mogran = require("morgan");
const fs_1 = require("fs");
const path_1 = require("path");
class Boot {
    constructor(controllers) {
        this.serverInstance = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.serverInstance.listen(Configuration_1.environment.PORT);
    }
    initializeMiddlewares() {
        const accessLogStream = (0, fs_1.createWriteStream)((0, path_1.join)(Configuration_1.environment.LOG_PATH, 'access.log'), { flags: 'a' });
        this.serverInstance.use(mogran('combined', {
            stream: accessLogStream,
        }));
        this.serverInstance.use(cors({
            origin: Configuration_1.environment.ALLOWED_ORIGIN,
            allowedHeaders: '*',
            methods: '*',
        }));
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.serverInstance.use('/api', controller.getRouter());
        });
    }
}
const bootstrap = (controllers) => new Boot(controllers);
exports.bootstrap = bootstrap;
//# sourceMappingURL=Boot.js.map