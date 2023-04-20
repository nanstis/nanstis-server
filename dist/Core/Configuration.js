"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = exports.configuration = void 0;
const tsyringe_1 = require("tsyringe");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
let Configuration = class Configuration {
    constructor() {
        this.environment = (0, dotenv_1.config)().parsed;
        this.rootPath = (0, path_1.join)(__dirname, '../../');
    }
    getEnvironment() {
        return this.environment;
    }
    getBasePath() {
        return this.rootPath;
    }
};
Configuration = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [])
], Configuration);
const configuration = tsyringe_1.container.resolve(Configuration);
exports.configuration = configuration;
const environment = configuration.getEnvironment();
exports.environment = environment;
//# sourceMappingURL=Configuration.js.map