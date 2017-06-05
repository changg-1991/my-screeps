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
            var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter: function(object) {
                    return object.resourceType == RESOURCE_ENERGY && object.amount > 300;
                }
            });

            if (target) {
                creep.memory.packingTarget = target.id;
                creep.memory.packingTargetTimeOut = Game.time + 8;
            }

            var target = Game.getObjectById(creep.memory.packingTarget);
            if (target) {
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {
            var storage = Game.getObjectById(Memory.objectId.W92S28_storage);
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        }
    },

    getBody: function(roomName) {
        return [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 3;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;