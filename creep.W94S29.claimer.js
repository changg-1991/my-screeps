var creepModule = {
    
    run: function(creep) {
        let targetRoom = 'W92S29';
        if (creep.room.name == targetRoom) {
            if (creep.room.controller) {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
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
        return 0;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;