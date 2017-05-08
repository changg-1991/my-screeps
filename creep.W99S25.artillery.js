var creepModule = {
    body: [CARRY,CARRY,MOVE],
    count: 1,
    createType: 'counting',

    run: function(creep) {
        var towerCount = 1;
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UNPACKING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UNPACKING';
            if (!creep.memory.towerTargetIndex) {
                creep.memory.towerTargetIndex = 0;
            } else {
                creep.memory.towerTargetIndex = (creep.memory.towerTargetIndex + 1) % towerCount;
            }
        }
        
        if (creep.memory.status == 'PACKING') {
            var storage = Game.getObjectById(Memory.objectId.W99S25_storage);
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#05ff05'}});
            }
        } else {
            var towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER;
                }
            });

            const tmpIndex = creep.memory.towerTargetIndex;
            while (true) {
                if (towers[creep.memory.towerTargetIndex].energy < towers[creep.memory.towerTargetIndex].energyCapacity) {
                    if (creep.transfer(towers[creep.memory.towerTargetIndex], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(towers[creep.memory.towerTargetIndex], {visualizePathStyle: {stroke: '#05ff05'}});
                    }
                    break;
                }
                creep.memory.towerTargetIndex = (creep.memory.towerTargetIndex + 1) % towerCount;
                if (tmpIndex == creep.memory.towerTargetIndex) {
                    break;
                }
            }
        }
    }
};

module.exports = creepModule;