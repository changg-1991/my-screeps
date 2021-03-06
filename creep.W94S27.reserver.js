var creepModule = {
    
    run: function(creep) {
        let targetRoom = 'W94S27';
        if (creep.room.name == targetRoom) {
            if (creep.room.controller) {
                if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {
                        reusePath: 15,
                        maxOps: 5000,
                        costCallback: function(roomName, costMatrix) {
                            if (roomName == 'W94S27') {
                                costMatrix.set(3, 39, 0);
                                costMatrix.set(3, 40, 0);
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
        return 0;
    },

    getCreateType: function(roomName) {
        return 'timing';
    },

    getCreateDelta: function(roomName) {
        return 400;
    },
};

module.exports = creepModule;