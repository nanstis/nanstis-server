"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const ClientProvider_1 = require("../Providers/ClientProvider");
const Configuration_1 = require("../Core/Configuration");
const FormData = require("form-data");
const fs_1 = require("fs");
class ClientService {
    constructor() {
        this.httpClient = new ClientProvider_1.Client(Configuration_1.environment.OPENAI_DOMAIN_NAME, Configuration_1.environment.OPENAI_BEARER_TOKEN, Configuration_1.environment.OPENAI_API_VERSION);
    }
    getModels() {
        return this.httpClient.get('/models').then((response) => {
            return response.data.map((model) => model.id);
        });
    }
    getModel(name) {
        return this.httpClient.get('/models/' + name)
            .then((response) => {
            return response;
        });
    }
    getCompletion(reqCompletion) {
        return this.httpClient.post('/chat/completions', reqCompletion)
            .then((response) => {
            return response;
        });
    }
    getTranscript(audioFilePath) {
        const data = new FormData();
        data.append('file', (0, fs_1.createReadStream)(audioFilePath));
        data.append('model', 'whisper-1');
        return this.httpClient.postFormData('/audio/transcriptions', data);
    }
}
exports.ClientService = ClientService;
//# sourceMappingURL=ClientService.js.map