var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
            var sourceChoosePool = new Array(0, 1, 1);
            creep.memory.sourceTarget = sourceChoosePool[Math.floor(Math.random() * sourceChoosePool.length)];
        }
        if (creep.memory.status != 'UPGRADING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UPGRADING';
        }
        if (creep.memory.status != 'UPGRADING' && creep.carry.energy < creep.carryCapacity) {
            creep.memory.status = 'PACKING';
        }
        
        if (creep.memory.status == 'PACKING') {
            var container = Game.getObjectById(Memory.containers.down.id);

            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#fff905'}});
            }
        }
    }
};

module.exports = roleUpgrader;