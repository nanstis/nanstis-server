'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
exports.modelController = void 0
var express_1 = require('express')
var Host_1 = require('./Host')
var ModelModule;
(function (ModelModule) {
    var GPT = Host_1.HostModule.GPT
    var getAll = function (req, res) {
        GPT.get('/models').then(function (response) {
            res.send(response.map(function (model) {
                return model.id
            }))
        })
    }
    var getOne = function (req, res) {
        GPT.get('/models/'.concat(req.params.id)).then(function (response) {
            res.send(response.map(function (model) {
                return model.id
            }))
        })
    }
    ModelModule.controller = (0, express_1.Router)()
        .get('/', getAll)
        .get('/:id', getOne)
})(ModelModule || (ModelModule = {}))
exports.modelController = ModelModule.controller
