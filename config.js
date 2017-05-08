var config = new Object();

// Creep
config.creep = new Object();
// W98S23
config.creep.W98S23_roleList = [
    'W98S23_farmer', 'W98S23_diggerDown', 'W98S23_transfer', 'W98S23_carrierDown', 'W98S23_diggerUp',
    'W98S23_carrierUp', 'W98S23_upgrader', 'W98S23_artillery','W98S23_builder',
    'W98S23_diggerRight', 'W98S23_carrierRight', 'W98S23_diggerUpUp', 'W98S23_carrierUpUp',
    'W98S23_claimer', 'W98S23_exploiter', 'W98S23_patrol', 'W98S23_himma', 'W98S23_reserveRight',
    'W98S23_safekeeper', 'W98S23_provoker', 'W98S23_reserveUpUp', 'W98S23_helper'
];
// W99S21
config.creep.W99S21_roleList = [
    'W99S21_farmer', 'W99S21_diggerDown', 'W98S23_transfer', 'W99S21_diggerUp', 'W99S21_carrierUp',
    'W99S21_upgrader', 'W99S21_builder', 'W99S21_himma', 'W99S22_digger', 'W99S22_carrier',
    'W99S22_reserver'
];
// W99S25
config.creep.W99S25_roleList = [
    'W99S25_diggerUp', 'W99S25_carrierUp', 'W99S25_diggerDown', 'W99S25_carrierDown',
    'W99S25_artillery', 'W99S25_upgrader', 'W99S25_builder'
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
Memory.objectId.W98S23_sourceDown = '58dbc2698283ff5308a3bd94';
Memory.objectId.W98S23_sourceRight = '58dbc2858283ff5308a3c015';
Memory.objectId.W98S23_sourceUpUp = '58dbc2698283ff5308a3bd90';
Memory.objectId.W99S21_sourceUp = '58dbc24d8283ff5308a3bb0c';
Memory.objectId.W99S21_sourceDown = '58dbc24d8283ff5308a3bb0e';
Memory.objectId.W99S25_sourceUp = '58dbc24e8283ff5308a3bb19';
Memory.objectId.W99S25_sourceDown = '58dbc24e8283ff5308a3bb1b';
Memory.objectId.W99S25_sourceUpUp = '58dbc24e8283ff5308a3bb17';
Memory.objectId.W99S22_source = '58dbc24d8283ff5308a3bb10';

Memory.objectId.W99S25_container = '590d39ff234a6c61148a40c3';

Memory.objectId.W98S23_storage = '59099cb119a517fc4d128670';
Memory.objectId.W99S21_storage = '590c70b87d189c611d9c90be';

Memory.objectId.W98S23_linkCenter = '590cebb48b01e59720ce9598';
Memory.objectId.W98S23_linkDown = '590ce5c7f4b336eb542b3e1e';
Memory.objectId.W99S21_linkCenter = '590f4e4a78e99f495daa27f3';
Memory.objectId.W99S21_linkLeft = '590fd754e95dd3464314d3ff';

Memory.ally = new Array('kikooo');

if (!Memory.birthTime) {
    Memory.birthTime = new Object();
}

if (!Memory.towerTarget) {
    Memory.towerTarget = new Object();
}

module.exports = config;