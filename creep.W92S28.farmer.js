var creepModule = {

    run: function(creep) {
        var energyFull = creep.room.energyAvailable < creep.room.energyCapacityAvailable ? false : true;

        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UNPACKING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UNPACKING';
            delete creep.memory.packingTarget;
        }

        if (creep.memory.status == 'PACKING') {
            var storage = Game.getObjectById(Memory.objectId.W92S28_storage);
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity * 0.9;
                }
            });
            if (target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
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
            }
        }
    },

    getBody: function(roomName) {
        if (Game.rooms.W92S28.energyAvailable <= 300) {
            return [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        } else {
            var bodyPart = []
            var bodyPartCount = Game.rooms.W92S28.energyAvailable / 100 > 5 : 5 : Game.rooms.W92S28.energyAvailable / 100 ;
            while (bodyPartCount > 0) {
                bodyPart.push(CARRY);
                bodyPart.push(MOVE);
                bodyPartCount -= 1;

            }
            return bodyPart;
        }
    },

    getCount: function(roomName) {
        return 1;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;