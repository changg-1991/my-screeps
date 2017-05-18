var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
        }
        if (creep.memory.status != 'UPGRADING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UPGRADING';
        }
        
        if (creep.memory.status == 'HARVESTING') {
            var source = Game.getObjectById(Memory.objectId.W94S29_sourceRight);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    },

    getBody: function(roomName) {
        return [CARRY,WORK,MOVE];
    },

    getCount: function(roomName) {
        return 1;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;