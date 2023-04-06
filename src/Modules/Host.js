"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostModule = void 0;
var axios_1 = require("axios");
var Config_1 = require("./Config");
var HostModule;
(function (HostModule) {
    var config = Config_1.ConfigModule.config;
    var MethodValue;
    (function (MethodValue) {
        MethodValue["GET"] = "GET";
        MethodValue["POST"] = "POST";
    })(MethodValue = HostModule.MethodValue || (HostModule.MethodValue = {}));
    var Client = /** @class */ (function () {
        function Client(domainName, bearerToken, apiVersion) {
            this.domainName = domainName;
            this.apiVersion = apiVersion;
            this.bearerToken = bearerToken;
            this.axiosInstance = axios_1.default.create();
        }
        Client.prototype.axiosRequest = function (path, method, config) {
            return this.axiosInstance.request(__assign(__assign({}, (config ? config : {})), { method: method, url: this.apiVersion + path, baseURL: this.domainName, headers: {
                    Authorization: "Bearer ".concat(this.bearerToken),
                    'Content-Type': 'application/json',
                } })).then(function (response) { return response.data.data; });
        };
        return Client;
    }());
    var Host = /** @class */ (function (_super) {
        __extends(Host, _super);
        function Host(domainName, bearerToken, apiVersion) {
            return _super.call(this, domainName, bearerToken, apiVersion) || this;
        }
        Host.prototype.get = function (path, config) {
            return this.axiosRequest(path, MethodValue.GET, config);
        };
        Host.prototype.post = function (path, config) {
            return this.axiosRequest(path, MethodValue.POST, config);
        };
        return Host;
    }(Client));
    HostModule.GPT = new Host(config.get().OPENAI_DOMAIN_NAME, config.get().OPENAI_BEARER_TOKEN, config.get().OPENAI_API_VERSION);
})(HostModule || (HostModule = {}));
exports.HostModule = HostModule;
