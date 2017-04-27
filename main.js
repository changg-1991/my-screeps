var config = require('config');
var runtime = require('runtime');
var creepController = require('creep.controller');
var structureController = require('structure.controller');

module.exports.loop = function () {

    runtime.run();

    structureController.run(config.structure);
    creepController.run(config.creep);
}