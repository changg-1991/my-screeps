var config = new Object();

// Creep
config.creep = new Object();

// W98S23
config.creep.W94S28_roleList = [
    'W98S23_builder'
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
Memory.objectId.W98S23_sourceUp = '58dbc2698283ff5308a3bd92';
Memory.objectId.W98S23_sourceUp = '58dbc2698283ff5308a3bd94';

Memory.ally = new Array('kikooo', 'Gorgar', 'Time_Shift');

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