var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UPGRADING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UPGRADING';
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
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    },

    getBody: function(roomName) {
        return [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE];
    },

    getCount: function(roomName) {
        if (Memory.W94S29_constructionSites.length > 0) {
            return 1;
        } else {
            return 2;
        }
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;