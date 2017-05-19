var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'TRANSFERING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'TRANSFERING';
        }
        
        if (creep.memory.status == 'PACKING') {
            var pos = new RoomPosition(11, 23, 'W94S29');
            var target = pos.findClosestByRange(FIND_DROPPED_ENERGY);
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
                var buildList = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (buildList.length > 0) {
                    if (creep.build(buildList[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(buildList[0]);
                    }
                } else {
                    var towerCount = 1;
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