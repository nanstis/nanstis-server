"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const express = require("express");
class Controller {
    constructor() {
        this.router = express();
        this.configureRouter();
        this.initializeRoutes();
    }
    getRouter() {
        return this.router;
    }
}
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map