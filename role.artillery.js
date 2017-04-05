var roleArtillery = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UNPACKING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UNPACKING';
            if (!creep.memory.towerTargetIndex) {
                creep.memory.towerTargetIndex = 0;
            } else {
                creep.memory.towerTargetIndex = (creep.memory.towerTargetIndex + 1) % 2;
            }
        }
        
        if (creep.memory.status == 'PACKING') {
            var storage = Game.getObjectById('58d9396b459b881b0d438215');

            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            var towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER;
                }
            });

            if (towers[creep.memory.towerTargetIndex].energy < towers[creep.memory.towerTargetIndex].energyCapacity) {
                if (creep.transfer(towers[creep.memory.towerTargetIndex], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[creep.memory.towerTargetIndex], {visualizePathStyle: {stroke: '#05ff05'}});
                }
            } else {
                creep.memory.towerTargetIndex = (creep.memory.towerTargetIndex + 1) % 2;
                if (towers[creep.memory.towerTargetIndex].energy < towers[creep.memory.towerTargetIndex].energyCapacity) {
                    if (creep.transfer(towers[creep.memory.towerTargetIndex], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(towers[creep.memory.towerTargetIndex], {visualizePathStyle: {stroke: '#05ff05'}});
                    }
                } else {
                    var link = Game.getObjectById('58e3d21f298292fe252676f7');
                    var result = creep.transfer(link, RESOURCE_ENERGY);
                    if (result == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};

module.exports = roleArtillery;