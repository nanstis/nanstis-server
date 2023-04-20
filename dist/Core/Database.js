"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const Configuration_1 = require("./Configuration");
const Segment_1 = require("../Database/Models/Segment");
const Transcript_1 = require("../Database/Models/Transcript");
const _1681829023582_Transcript_1 = require("../Database/Migrations/1681829023582-Transcript");
const _1681829406371_Segment_1 = require("../Database/Migrations/1681829406371-Segment");
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    schema: 'public',
    host: Configuration_1.environment.DB_HOST,
    port: +Configuration_1.environment.DB_PORT,
    username: Configuration_1.environment.DB_USER,
    password: Configuration_1.environment.DB_PASSWORD,
    database: Configuration_1.environment.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        Segment_1.Segment,
        Transcript_1.Transcript,
    ],
    migrations: [
        _1681829023582_Transcript_1.Transcript1681829023582,
        _1681829406371_Segment_1.Segment1681829406371,
    ],
});
//# sourceMappingURL=Database.js.map