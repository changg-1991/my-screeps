var creepModule = {
    body: [TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL],
    count: 2,
    createType: 'counting',

    run: function(creep) {
        var targetRoom = 'W99S25';

        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return Memory.ally.indexOf(object.owner) == -1;
            }
        });

        if (closestHostile) {
            if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestHostile);
            }
            creep.heal(creep);
        } else {
            if (creep.room.name != targetRoom) {
                const route = Game.map.findRoute(creep.room, targetRoom);
                if (route.length > 0) {
                    const exit = creep.pos.findClosestByRange(route[0].exit);
                    PathFinder.use(true);
                    creep.moveTo(exit);
                }
            }
        }
    }
};

module.exports = creepModule;