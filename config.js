var config = new Object();

// Creep
config.creep = new Object();
// W94S29
config.creep.W94S29_roleList = [
    'W94S29_farmerRight', 'W94S29_farmerLeft', 'W94S29_upgraderRight', 'W94S29_upgraderLeft', 'W94S29_builder'
];

for (const i in config.creep) {
    let roleList = config.creep[i]
    for (const j in roleList) {
        let role = roleList[j];
        let moduleFile = 'creep.' + role.replace('_', ".");
        config.creep[role] = require(moduleFile);
    }
}

// Structure
config.structure = new Object();
config.structure.link = require('structure.link');
config.structure.tower = require('structure.tower');
config.structure.rampart = require('structure.rampart');

// Object Id
Memory.objectId = new Object();
Memory.objectId.W94S29_sourceLeft = '58dbc2e08283ff5308a3cae8';
Memory.objectId.W94S29_sourceRight = '58dbc2e08283ff5308a3cae9';

Memory.ally = new Array('kikooo');

if (!Memory.birthTime) {
    Memory.birthTime = new Object();
}

if (!Memory.towerTarget) {
    Memory.towerTarget = new Object();
}

module.exports = config;