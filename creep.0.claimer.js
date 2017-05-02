var creepModule = {
    // Game.spawns['Spawn1'].createCreep([CLAIM,MOVE], undefined, {role: '_0Claimer'});
    body: [CLAIM,MOVE],
    count: 0,
    createType: 'counting',

    /** @param {Creep} creep **/
    run: function(creep) {
        let targetRoom = 'W99S21';

        if (creep.room.name == targetRoom) {
            if(creep.room.controller) {
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        } else {
            const route = Game.map.findRoute(creep.room, targetRoom);
            if(route.length > 0) {
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);
            }
        }
    }
};

module.exports = creepModule;