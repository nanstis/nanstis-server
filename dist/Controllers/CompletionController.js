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
exports.CompletionController = void 0;
const body_parser_1 = require("body-parser");
const Controller_1 = require("../Core/Controller");
const tsyringe_1 = require("tsyringe");
const ClientService_1 = require("../Services/ClientService");
let CompletionController = class CompletionController extends Controller_1.Controller {
    constructor(clientService) {
        super();
        this.clientService = clientService;
    }
    getCompletion() {
        return (req, res) => {
            const prompt = req.body;
            this.clientService.getCompletion(prompt)
                .then((response) => {
                res.send(response);
            });
        };
    }
    configureRouter() {
        this.router.use((0, body_parser_1.json)());
    }
    initializeRoutes() {
        this.router.post('/completions', this.getCompletion());
    }
};
CompletionController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [ClientService_1.ClientService])
], CompletionController);
exports.CompletionController = CompletionController;
//# sourceMappingURL=CompletionController.js.map