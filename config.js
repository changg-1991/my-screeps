var config = new Object();

// Creep
config.creep = new Object();
// W94S29
config.creep.W94S29_roleList = [
    'W94S29_farmer', 'W94S29_diggerRight', 'W94S29_diggerLeft', 'W94S29_artillery',
    'W94S29_upgraderRight', 'W94S29_upgraderLeft', 'W95S29_reserver', 'W95S29_digger',
    'W95S29_carrier', 'W94S29_builder', 'W94S29_destroyer', 'W94S29_fighter', 'W94S29_healler',
    'W92S29_diggerLeft', 'W92S29_diggerRight', 'W92S29_builder'
];
// W92S29
config.creep.W94S29_roleList = [
    'W92S29_builder2'
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
Memory.objectId.W95S29_source = '58dbc2c28283ff5308a3c730';

Memory.objectId.W94S29_storage = '592093fcd1c41e5ee8957af0';

Memory.objectId.W92S29_sourceLeft = '58dbc3188283ff5308a3d07a';
Memory.objectId.W92S29_sourceRight = '58dbc3188283ff5308a3d079';

Memory.ally = new Array('kikooo');

if (!Memory.birthTime) {
    Memory.birthTime = new Object();
}

if (!Memory.towerTarget) {
    Memory.towerTarget = new Object();
}

if (!Memory.rooms.W94S29.wallHits) {
    Memory.rooms.W94S29.wallHits = 1000;
}

module.exports = config;