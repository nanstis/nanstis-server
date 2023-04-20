"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("./Core/Database");
const Boot_1 = require("./Core/Boot");
const tsyringe_1 = require("tsyringe");
const TranscriptController_1 = require("./Controllers/TranscriptController");
const ModelController_1 = require("./Controllers/ModelController");
const CompletionController_1 = require("./Controllers/CompletionController");
const Logger_1 = require("./Core/Logger");
const Configuration_1 = require("./Core/Configuration");
Database_1.dataSource.initialize().then(() => {
    (0, Boot_1.bootstrap)([
        tsyringe_1.container.resolve(TranscriptController_1.TranscriptController),
        tsyringe_1.container.resolve(CompletionController_1.CompletionController),
        tsyringe_1.container.resolve(ModelController_1.ModelController),
    ]);
    Logger_1.logger.info(`Server started on port ${Configuration_1.environment.PORT}`);
});
//# sourceMappingURL=index.js.map