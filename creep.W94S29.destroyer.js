var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'DESTROYING' && creep.carry.energy == 0) {
            creep.memory.status = 'DESTROYING';
        }
        if (creep.memory.status != 'UPGRADING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UPGRADING';
        }
        
        if (creep.memory.status == 'DESTROYING') {
            const target = Game.getObjectById('590b21b4ae8ddaf843a206d2');
            if (target) {
                if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
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
        return [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 0;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;