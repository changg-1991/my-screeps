var config = new Object();

// Creep
config.creep = new Object();
config.creep._0RoleList = ['_0Claimer', '_0Exploiter'];
// Room 1
config.creep._1RoleList = [
    '_1Eva', '_1DiggerLeft', '_1CarrierLeft', '_1DiggerRight', '_1CarrierDown',
    '_1Upgrader', '_1Artillery', '_1Builder', '_1Himma', '_1Security', '_1ReserverUp',
    '_1RepairerUp', '_1DiggerUp', '_1CarrierUp'
];
// Room 2
config.creep._2RoleList = [
    '_2Digger', '_2Farmer', '_2Carrier', '_2Upgrader', '_2Builder'
];
// Room 3
config.creep._3RoleList = [
    '_3DiggerRight', '_3CarrierRight', '_3DiggerLeft', '_3CarrierCenter',
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
Memory.objectId._1SourceLeft = '5873bb8a11e3e4361b4d602a';
Memory.objectId._1SourceRight = '5873bb8a11e3e4361b4d602b';
Memory.objectId._1SourceSteal = '5873bb8a11e3e4361b4d6028';
Memory.objectId._2Source = '5873bb8a11e3e4361b4d602e';
Memory.objectId._3SourceRight = '5873bbb811e3e4361b4d65b5';
Memory.objectId._3SourceLeft = '5873bbb811e3e4361b4d65b4';

Memory.objectId._1ContainerLeft = '58da2768a3467e793134676f';
Memory.objectId._1ContainerUp = '58eda1d060a8ee98057be586';
Memory.objectId._2ContainerLeft = '58de653068259520574e024c';
Memory.objectId._3Container = '58f4e5325636440e7ca91873';

Memory.objectId._1Storage = '58e5620346189d7d36531063';
Memory.objectId._2Storage = '58e79fe0bca059b021f8d443';
Memory.objectId._3Storage = '58fa1e86d5510a933fa93b68';

Memory.objectId._1LinkLeft = '58fb4e8355dcce32747968fd';
Memory.objectId._1LinkRight = '58fd95dbfcf251d166e7f806';
Memory.objectId._1LinkDown = '58e3d21f298292fe252676f7';
Memory.objectId._2LinkLeft = '58ea2075a72631fe48c93314';
Memory.objectId._2LinkRight = '58e9d9d3d233d37b682eb041';
Memory.objectId._3LinkLeft = '58facd8f853991417ece9bbf';
Memory.objectId._3LinkCenter = '58fada4a224988f9271b1e57';

Memory.ally = new Array('kikooo');

if (!Memory.birthTime) {
    Memory.birthTime = new Object();
}

module.exports = config;