"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
var env = require("dotenv");
var tslog_1 = require("tslog");
var path = require("path");
var ConfigModule;
(function (ConfigModule) {
    var Configuration = /** @class */ (function () {
        function Configuration(environment) {
            this.appLogger = new tslog_1.Logger({
                type: 'pretty',
                name: 'Application',
            });
            this.environment = environment;
            this.rootPath = path.join(__dirname, '../../');
        }
        Configuration.prototype.get = function () {
            return this.environment;
        };
        Configuration.prototype.getLogger = function () {
            return this.appLogger;
        };
        return Configuration;
    }());
    ConfigModule.config = new Configuration(env.config().parsed);
    ConfigModule.logger = ConfigModule.config.getLogger();
})(ConfigModule || (ConfigModule = {}));
exports.ConfigModule = ConfigModule;
