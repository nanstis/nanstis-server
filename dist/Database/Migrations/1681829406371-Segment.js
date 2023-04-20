"use strict";
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
exports.Segment1681829406371 = void 0;
class Segment1681829406371 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE segments (
                id SERIAL PRIMARY KEY,
                absolute_path VARCHAR NOT NULL,
                text VARCHAR NOT NULL,
                transcript_id INTEGER,
                FOREIGN KEY (transcript_id) REFERENCES transcripts(id) ON DELETE CASCADE
            );`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE IF EXISTS segments;`);
        });
    }
}
exports.Segment1681829406371 = Segment1681829406371;
//# sourceMappingURL=1681829406371-Segment.js.map