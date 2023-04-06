"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
var express = require("express");
var Config_1 = require("./Config");
var CoreModule;
(function (CoreModule) {
    var config = Config_1.ConfigModule.config;
    var Core = /** @class */ (function () {
        function Core(port) {
            this.serverInstance = express();
            this.serverInstance.listen(port);
        }
        Core.prototype.getInstance = function () {
            return this.serverInstance;
        };
        return Core;
    }());
    var core = new Core(config.get().PORT);
    CoreModule.load = function (path, requestHandler) {
        return core.getInstance().use(path, requestHandler);
    };
})(CoreModule || (CoreModule = {}));
exports.CoreModule = CoreModule;
