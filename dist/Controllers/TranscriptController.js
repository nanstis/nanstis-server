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
exports.TranscriptController = void 0;
const tsyringe_1 = require("tsyringe");
const FileHandler_1 = require("../Core/FileHandler");
const Controller_1 = require("../Core/Controller");
const TranscriptService_1 = require("../Services/TranscriptService");
let TranscriptController = class TranscriptController extends Controller_1.Controller {
    constructor(transcriptService) {
        super();
        this.transcriptService = transcriptService;
    }
    generateText() {
        return (req, res) => {
            const incomingFile = req.file;
            this.transcriptService.createTranscript(incomingFile).then((promises) => {
                Promise.all(promises).then((segments) => {
                    res.send(segments);
                });
            });
        };
    }
    configureRouter() {
        this.router
            .use((0, FileHandler_1.incomingFile)('file'));
    }
    initializeRoutes() {
        this.router.post('/transcription', this.generateText());
    }
};
TranscriptController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [TranscriptService_1.TranscriptService])
], TranscriptController);
exports.TranscriptController = TranscriptController;
//# sourceMappingURL=TranscriptController.js.map