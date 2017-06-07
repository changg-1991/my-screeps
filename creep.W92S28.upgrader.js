var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UPGRADING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UPGRADING';
        }
        
        if (creep.memory.status == 'PACKING') {
            var storage = Game.getObjectById(Memory.objectId.W92S28_storage);
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        } else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    },

    getBody: function(roomName) {
        return [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE];
    },

    getCount: function(roomName) {
        return 2;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;