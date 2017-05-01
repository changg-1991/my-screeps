var config = new Object();

// Creep
config.creep = new Object();
config.creep._0RoleList = ['_0Claimer', '_0Exploiter'];
// W98S23
config.creep._3RoleList = [
    '_3DiggerUp', '_3CarrierUp', '_3DiggerDown',
    '_3Upgrader', '_3Builder'
];

for (const i in config.creep) {
    let roleList = config.creep[i]
    for (const j in roleList) {
        let role = roleList[j]
        let moduleFile = 'creep' + role.substring(1).replace(/([A-Z0-9])/g,".$1").toLowerCase();
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

Memory.ally = new Array('kikooo');

if (!Memory.birthTime) {
    Memory.birthTime = new Object();
}

module.exports = config;