var roleUpgrader = {

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UPGRADING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UPGRADING';
        }
        if (creep.memory.status != 'UPGRADING' && creep.carry.energy < creep.carryCapacity) {
            creep.memory.status = 'PACKING';
        }
        
        if (creep.memory.status == 'PACKING') {
            var link = Game.getObjectById('58e3d21f298292fe252676f7');

            if(creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#fff905'}});
            }
        }
    }
};

module.exports = roleUpgrader;