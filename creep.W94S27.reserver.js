var creepModule = {
    
    run: function(creep) {
        let targetRoom = 'W94S27';
        if (creep.room.name == targetRoom) {
            if (creep.room.controller) {
                if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {
                        costCallback: function(roomName, costMatrix) {
                            if (roomName == 'W94S27') {
                                for (i = 0; i < 50; i++) {
                                    for (j = 0; j < 50; j++) {
                                        costMatrix.set(i, j, 0);
                                    }
                                }
                            }
                        }
                    });
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