var creepModule = {

    run: function(creep) {

        if (creep.memory.status != 'PACKING' && creep.carry[RESOURCE_UTRIUM] == undefined) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UNPACKING' && creep.carry[RESOURCE_UTRIUM] == creep.carryCapacity) {
            creep.memory.status = 'UNPACKING';
        }

        if (creep.memory.status == 'PACKING') {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_UTRIUM] > 0;
                }
            });

            if (target) {
                if (creep.withdraw(target, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {
            var storage = Game.getObjectById(Memory.objectId.W94S29_storage);
            if (creep.transfer(storage, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        }
    },

    getBody: function(roomName) {
        return [CARRY,CARRY,MOVE,MOVE];
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