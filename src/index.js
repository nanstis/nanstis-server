"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = require("./Modules/Core");
var ModelController_1 = require("./Controllers/ModelController");
var IndexModule;
(function (IndexModule) {
    IndexModule.bootstrap = function () {
        Core_1.CoreModule.load('/models', ModelController_1.modelController);
    };
})(IndexModule || (IndexModule = {}));
