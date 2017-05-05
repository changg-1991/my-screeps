var creepModule = {
    body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL],
    count: 0,
    createType: 'counting',

    run: function(creep) {
        var homeRoom = 'W98S23';
        var targetRoom = 'W95S23';

        if (creep.room.name != targetRoom && creep.hits > creep.hitsMax * 0.8) {
            creep.memory.status = 'PROVOKER';
        }

        if (creep.hits < creep.hitsMax * 0.7) {
            creep.memory.status = 'ESCAPE';
        }

        //creep.moveTo(42,39);

        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return Memory.ally.indexOf(object.owner) == -1;
            }
        });

        var structure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(object) {
                return object.structureType == STRUCTURE_TOWER;
            }
        });

        if (creep.memory.status == 'PROVOKER') {
            if (closestHostile) {
                if (creep.pos.isNearTo(closestHostile)) {
                    var result = creep.attack(closestHostile);
                    console.log(creep.name + ' attack: ' + result);
                } else {
                    creep.moveTo(closestHostile);
                }
            } else {
                if (creep.room.name == targetRoom) {
                    if (structure) {
                        if (creep.attack(structure) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(structure);
                        }
                    }
                } else {
                    const route = Game.map.findRoute(creep.room, targetRoom);
                    if (route.length > 0) {
                        const exit = creep.pos.findClosestByRange(route[0].exit);
                        PathFinder.use(true);
                        creep.moveTo(exit);
                    }
                }
            }
            creep.heal(creep);
        } else if (creep.memory.status == 'ESCAPE') {
            if (creep.pos.inRangeTo(closestHostile, 3)) {
                const route = Game.map.findRoute(creep.room, homeRoom);
                if (route.length > 0) {
                    const exit = creep.pos.findClosestByRange(route[0].exit);
                    PathFinder.use(true);
                    creep.moveTo(exit);
                }
            } else {
                //
            }
            creep.heal(creep);
        } else {

        }
    }
};

module.exports = creepModule;