"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscriptRepository = void 0;
const Transcript_1 = require("../Models/Transcript");
const Repository_1 = require("./Repository");
class TranscriptRepository extends Repository_1.Repository {
    constructor() {
        super(Transcript_1.Transcript);
    }
    createTranscript(destPath) {
        const transcript = new Transcript_1.Transcript();
        transcript.absolutePath = destPath;
        return this.repository.save(transcript);
    }
}
exports.TranscriptRepository = TranscriptRepository;
//# sourceMappingURL=TranscriptRepository.js.map