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
exports.ModelController = void 0;
const Controller_1 = require("../Core/Controller");
const ClientService_1 = require("../Services/ClientService");
const body_parser_1 = require("body-parser");
const tsyringe_1 = require("tsyringe");
let ModelController = class ModelController extends Controller_1.Controller {
    constructor(clientService) {
        super();
        this.clientService = clientService;
    }
    getModels() {
        return (req, res) => {
            this.clientService.getModels()
                .then((response) => {
                res.send({ models: response });
            });
        };
    }
    getModel() {
        return (req, res) => {
            const modelId = req.params.modelId;
            this.clientService.getModel(modelId)
                .then((response) => {
                res.send(response);
            });
        };
    }
    configureRouter() {
        this.router.use((0, body_parser_1.json)());
    }
    initializeRoutes() {
        this.router
            .get('/models', this.getModels())
            .get('/models/:modelId', this.getModel());
    }
};
ModelController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [ClientService_1.ClientService])
], ModelController);
exports.ModelController = ModelController;
//# sourceMappingURL=ModelController.js.map