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
            if (!creep.memory.packingTarget || creep.memory.packingTargetTimeOut < Game.time) {
                var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
                    filter: function(object) {
                        return object.amount > 300;
                    }
                });

                if (target) {
                    creep.memory.packingTarget = target.id;
                    creep.memory.packingTargetTimeOut = Game.time + 8;
                }
            }

            var target = Game.getObjectById(creep.memory.packingTarget);
            if (target) {
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                }
            });
            if (target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    },

    getBody: function(roomName) {
        return [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 2;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;