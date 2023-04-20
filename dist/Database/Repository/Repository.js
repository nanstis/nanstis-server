"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const Database_1 = require("../../Core/Database");
class Repository {
    constructor(entity) {
        this.repository = Database_1.dataSource.getRepository(entity);
    }
}
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map