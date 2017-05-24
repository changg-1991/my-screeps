var creepModule = {

    run: function(creep) {
        var energyFull = creep.room.energyAvailable < creep.room.energyCapacityAvailable ? false : true;

        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'TRANSFERING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'TRANSFERING';
        }
        
        if (creep.memory.status == 'PACKING') {
            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
                filter: function(object) {
                    return object.amount > 1000;
                }
            });
            if (target) {
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                if (!energyFull)
                    var storage = Game.getObjectById(Memory.objectId.W94S29_storage);
                    if (creep.withdraw(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        } else {
            if (!energyFull) {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: function (structure) {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                    }
                });
                if (target) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            } else {
                var storage = Game.getObjectById(Memory.objectId.W94S29_storage);
                if (creep.transfer(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    },

    getBody: function(roomName) {
        return [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 1;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;