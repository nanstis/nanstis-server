"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentRepository = void 0;
const Repository_1 = require("./Repository");
const Segment_1 = require("../Models/Segment");
class SegmentRepository extends Repository_1.Repository {
    constructor() {
        super(Segment_1.Segment);
    }
    createSegment(transcript, absolutePath, text) {
        const segment = new Segment_1.Segment();
        segment.text = text;
        segment.absolutePath = absolutePath;
        segment.transcript = transcript;
        return this.repository.save(segment);
    }
    getSegments(transcript) {
        return this.repository.find({
            where: {
                transcript: transcript,
            },
        });
    }
}
exports.SegmentRepository = SegmentRepository;
//# sourceMappingURL=SegmentRepository.js.map