var creepModule = {

    run: function(creep) {
        var towerCount = 2;

        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'TRANSFERING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'TRANSFERING';
            if (!creep.memory.towerTargetIndex) {
                creep.memory.towerTargetIndex = 0;
            } else {
                creep.memory.towerTargetIndex = (creep.memory.towerTargetIndex + 1) % towerCount;
            }
        }
        
        if (creep.memory.status == 'PACKING') {
            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if (target) {
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
            });
            if (target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
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
                            creep.moveTo(towers[creep.memory.towerTargetIndex]);
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
    },

    getBody: function(roomName) {
        return [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 1;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;