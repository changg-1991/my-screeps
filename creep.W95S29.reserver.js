var creepModule = {
    
    run: function(creep) {
        let targetRoom = 'W95S29';
        if (creep.room.name == targetRoom) {
            if (creep.room.controller) {
                if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        } else {
            const route = Game.map.findRoute(creep.room, targetRoom);
            if (route.length > 0) {
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);
            }
        }
    },

    getBody: function(roomName) {
        return [CLAIM,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 2;
    },

    getCreateType: function(roomName) {
        return 'timing';
    },

    getCreateDelta: function(roomName) {
        return 400;
    },
};

module.exports = creepModule;