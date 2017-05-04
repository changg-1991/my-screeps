var creepModule = {
    body: [CLAIM,CLAIM,MOVE,MOVE],
    count: 1,
    createType: 'timing',
    createDelta: 800,

    run: function(creep) {
        let targetRoom = 'W97S23';

        if (creep.room.name == targetRoom) {
            if (creep.room.controller) {
                if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
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