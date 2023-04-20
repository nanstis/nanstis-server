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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscriptService = void 0;
const tsyringe_1 = require("tsyringe");
const TranscriptRepository_1 = require("../Database/Repository/TranscriptRepository");
const FfmpegProvider_1 = require("../Providers/FfmpegProvider");
const fs_1 = require("fs");
const ClientService_1 = require("./ClientService");
const path_1 = require("path");
const SegmentRepository_1 = require("../Database/Repository/SegmentRepository");
const Logger_1 = require("../Core/Logger");
let TranscriptService = class TranscriptService {
    constructor(transcriptRepository, segmentRepository, clientService) {
        this.transcriptRepository = transcriptRepository;
        this.segmentRepository = segmentRepository;
        this.clientService = clientService;
    }
    createTranscript(file) {
        return __awaiter(this, void 0, void 0, function* () {
            this.file = file;
            Logger_1.logger.info(this.file);
            const dirPath = this.file.destination;
            return this.transcriptRepository.createTranscript(dirPath)
                .then((transcript) => {
                this.extractAudio();
                this.splitAudio();
                return (0, fs_1.readdirSync)(dirPath).map((file) => {
                    const filePath = (0, path_1.join)(dirPath, file);
                    return this.clientService.getTranscript(filePath)
                        .then((response) => __awaiter(this, void 0, void 0, function* () {
                        (0, fs_1.rmSync)(filePath);
                        return this.segmentRepository.createSegment(transcript, filePath, response.text)
                            .then((segment) => {
                            Logger_1.logger.info(segment.absolutePath);
                            return segment;
                        });
                    }));
                });
            });
        });
    }
    extractAudio() {
        this.audioPath = `${this.file.path}.mp3`;
        new FfmpegProvider_1.FfmpegProvider(this.file.path)
            .formatTo('mp3')
            .bitRate(16)
            .channels(1)
            .outDir(this.audioPath)
            .execSync();
        (0, fs_1.rmSync)(this.file.path);
    }
    splitAudio() {
        new FfmpegProvider_1.FfmpegProvider(this.audioPath)
            .formatTo('segment')
            .segmentTime(60)
            .outDirCopy(`${this.file.destination}/%03d.mp3`)
            .execSync();
        (0, fs_1.rmSync)(this.audioPath);
    }
};
TranscriptService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [TranscriptRepository_1.TranscriptRepository,
        SegmentRepository_1.SegmentRepository,
        ClientService_1.ClientService])
], TranscriptService);
exports.TranscriptService = TranscriptService;
//# sourceMappingURL=TranscriptService.js.map