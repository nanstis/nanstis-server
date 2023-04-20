"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = require("axios");
class Client {
    constructor(domainName, bearerToken, apiVersion) {
        this.domainName = domainName;
        this.apiVersion = apiVersion;
        this.bearerToken = bearerToken;
        this.axiosInstance = axios_1.default.create();
    }
    get(path, params) {
        return this.axiosRequest(path, 'GET', Object.assign({ params: params }, this.newHeaders('application/json')));
    }
    post(path, data) {
        return this.axiosRequest(path, 'POST', Object.assign({ data: data }, this.newHeaders('application/json')));
    }
    postFormData(path, data) {
        return this.axiosInstance.post(this.url(path), data, Object.assign({}, this.newHeaders('multipart/form-data'))).then((response) => response.data);
    }
    axiosRequest(path, method, config) {
        return this.axiosInstance.request(Object.assign(Object.assign({}, (config ? config : {})), { method: method, url: this.apiVersion + path, baseURL: this.domainName })).then((response) => response.data);
    }
    url(path) {
        return `${this.domainName}/${this.apiVersion}` + path;
    }
    newHeaders(contentType, headers) {
        return {
            headers: Object.assign({ 'Content-Type': contentType, 'Authorization': `Bearer ${this.bearerToken}` }, headers),
        };
    }
}
exports.Client = Client;
//# sourceMappingURL=ClientProvider.js.map