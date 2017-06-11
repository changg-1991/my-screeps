var creepModule = {

    run: function(creep) {

        if (creep.memory.status != 'PACKING' && creep.carry.RESOURCE_UTRIUM == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UNPACKING' && creep.carry.RESOURCE_UTRIUM == creep.carryCapacity) {
            creep.memory.status = 'UNPACKING';
        }

        if (creep.memory.status == 'PACKING') {
            var pos = new RoomPosition(25, 4, 'W94S29');
            var target = pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter: function(object) {
                    return object.resourceType == RESOURCE_UTRIUM;
                }
            });
            if (target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {
            var storage = Game.getObjectById(Memory.objectId.W92S29_storage);
            if (creep.transfer(storage, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
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
        return 'timing';
    },

    getCreateDelta: function(roomName) {
        return 1500;
    },
};

module.exports = creepModule;