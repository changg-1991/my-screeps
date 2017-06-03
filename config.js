var config = new Object();

// Creep
config.creep = new Object();
// W94S29
config.creep.W94S29_roleList = [
    'W94S29_farmer', 'W94S29_diggerRight', 'W94S29_diggerLeft', 'W94S29_artillery',
    'W94S29_upgraderRight', 'W94S29_upgraderLeft', 'W95S29_reserver', 'W95S29_digger',
    'W95S29_carrier', 'W94S29_builder', 'W94S28_diggerUp', 'W94S28_diggerDown'
];
// W92S29
config.creep.W92S29_roleList = [
    'W92S29_farmer', 'W92S29_carrier', 'W92S29_diggerRight', 'W92S29_transfer', 'W92S29_diggerLeft',
    'W92S29_carrierController', 'W92S29_upgrader',
    'W92S29_builder', 'W92S28_diggerUp', 'W92S28_diggerDown'
];

// W94S28
config.creep.W94S28_roleList = [
    'W94S28_farmer', 'W94S28_builder'
];

// W92S28
config.creep.W92S28_roleList = [
    'W92S28_farmer', 'W92S28_builder'
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

Memory.objectId.W94S28_sourceUp = '58dbc2df8283ff5308a3cae4';
Memory.objectId.W94S28_sourceDown = '58dbc2df8283ff5308a3cae5';

Memory.objectId.W92S28_sourceUp = '58dbc3188283ff5308a3d075';
Memory.objectId.W92S28_sourceDown = '58dbc3188283ff5308a3d077';

Memory.objectId.W92S29_linkRight = '592f9ea81358b03068899082';
Memory.objectId.W92S29_linkCenter = '592f8b661c8b90d606019835';

Memory.objectId.W92S29_storage = '592c4dc0195eca196f68cf6d';

Memory.ally = new Array('kikooo', 'Time_Shift');

if (!Memory.birthTime) {
    Memory.birthTime = new Object();
}

if (!Memory.towerTarget) {
    Memory.towerTarget = new Object();
}

if (!Memory.rooms.W94S29.wallHits) {
    Memory.rooms.W94S29.wallHits = 1000;
}

if (!Memory.rooms.W92S29.wallHits) {
    Memory.rooms.W92S29.wallHits = 1000;
}

if (!Memory.rooms.W94S28.wallHits) {
    Memory.rooms.W94S28.wallHits = 1000;
}

if (!Memory.rooms.W92S28.wallHits) {
    Memory.rooms.W92S28.wallHits = 1000;
}

module.exports = config;