var creepModule = {
    body: [CLAIM,MOVE,MOVE,MOVE,MOVE],
    count: 2,
    createType: 'timing',
    createDelta: 400,

    run: function(creep) {
        let targetRoom = 'W99S22';

        if (creep.room.name == targetRoom) {
            if (creep.room.controller) {
                if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {
                        costCallback: function(roomName, costMatrix) {
                            costMatrix.set(0, 0, 255);
                            costMatrix.set(0, 1, 255);
                            costMatrix.set(0, 2, 255);
                            costMatrix.set(0, 3, 255);
                            costMatrix.set(0, 4, 255);
                            costMatrix.set(0, 5, 255);
                            costMatrix.set(0, 6, 255);
                            costMatrix.set(0, 7, 255);
                            costMatrix.set(0, 8, 255);
                            costMatrix.set(0, 9, 255);
                            costMatrix.set(0, 0, 255);
                            costMatrix.set(0, 11, 255);
                            costMatrix.set(0, 12, 255);
                            costMatrix.set(0, 13, 255);
                            costMatrix.set(0, 14, 255);
                            costMatrix.set(0, 15, 255);
                            costMatrix.set(0, 16, 255);
                            costMatrix.set(0, 17, 255);
                            costMatrix.set(0, 18, 255);
                            costMatrix.set(0, 19, 255);
                            costMatrix.set(0, 20, 255);
                            costMatrix.set(0, 21, 255);
                            costMatrix.set(0, 22, 255);
                            costMatrix.set(0, 23, 255);
                            costMatrix.set(0, 24, 255);
                            costMatrix.set(0, 25, 255);
                            costMatrix.set(0, 26, 255);
                            costMatrix.set(0, 27, 255);
                            costMatrix.set(0, 28, 255);
                            costMatrix.set(0, 29, 255);
                            costMatrix.set(0, 30, 255);
                            costMatrix.set(0, 31, 255);
                            costMatrix.set(0, 32, 255);
                            costMatrix.set(0, 33, 255);
                            costMatrix.set(0, 34, 255);
                            costMatrix.set(0, 35, 255);
                            costMatrix.set(0, 36, 255);
                            costMatrix.set(0, 37, 255);
                            costMatrix.set(0, 38, 255);
                            costMatrix.set(0, 39, 255);
                            costMatrix.set(0, 40, 255);
                            costMatrix.set(0, 41, 255);
                            costMatrix.set(0, 42, 255);
                            costMatrix.set(0, 43, 255);
                            costMatrix.set(0, 44, 255);
                            costMatrix.set(0, 45, 255);
                            costMatrix.set(0, 46, 255);
                            costMatrix.set(0, 47, 255);
                            costMatrix.set(0, 48, 255);
                            costMatrix.set(0, 49, 255);
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
    }
};

module.exports = creepModule;