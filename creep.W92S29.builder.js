var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'BUILDING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'BUILDING';
            delete creep.memory.packingTarget;
        }

        if (creep.memory.status == 'PACKING') {
            var storage = Game.getObjectById(Memory.objectId.W92S29_storage);
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        } else {
            var constructionSites = Game.rooms['W92S29'].find(FIND_CONSTRUCTION_SITES);
            if (constructionSites.length > 0) {
                if (creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSites[0]);
                }
            } else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    },

    getBody: function(roomName) {
        return [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 5;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;