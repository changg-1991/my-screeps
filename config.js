var config = new Object();

// Creep
config.creep = new Object();
// W98S23
config.creep.W98S23_roleList = [
    'W98S23_diggerDown', 'W98S23_carrierDown', 'W98S23_diggerUp', 'W98S23_carrierUp',
    'W98S23_upgrader', 'W98S23_builder', 'W98S23_diggerRight', 'W98S23_carrierRight',
    'W98S23_claimer', 'W98S23_exploiter'
];
// W99S21
config.creep.W99S21_roleList = [
    'W99S21_diggerUp', 'W99S21_carrierUp', 'W99S21_diggerDown', 'W99S21_upgrader'
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
Memory.objectId._3SourceUp = '58dbc2698283ff5308a3bd92';
Memory.objectId._3SourceDown = '58dbc2698283ff5308a3bd94';
Memory.objectId._3SourceRight = '58dbc2858283ff5308a3c015';
Memory.objectId.W99S21_sourceUp = '58dbc24d8283ff5308a3bb0c';
Memory.objectId.W99S21_sourceDown = '58dbc24d8283ff5308a3bb0e';

Memory.objectId._3Container = '59074ca588cfce7d4895b438';

Memory.ally = new Array('kikooo');

if (!Memory.birthTime) {
    Memory.birthTime = new Object();
}

module.exports = config;