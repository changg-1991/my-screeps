var creepModule = {
    body: [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
    count: 1,
    createType: 'counting',

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'REPAIRING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'REPAIRING';
        }

        if (creep.memory.status == 'PACKING') {
            var storage = Game.getObjectById(Memory.objectId.W98S23_storage);

            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(object) {
                    return object.structureType == STRUCTURE_WALL && object.hits < 10000;
                }
            });

            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#09d5ff'}});
                }
            }
        }
    }
};

module.exports = creepModule;