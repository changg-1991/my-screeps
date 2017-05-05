var creepModule = {
    body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL],
    count: 1,
    createType: 'counting',

    run: function(creep) {
        var homeRoom = 'W98S23';
        var targetRoom = 'W95S23';

        if (creep.room.name != targetRoom && creep.getActiveBodyparts(ATTACK) > 0) {
            creep.memory.status = 'PROVOKER';
        }

        if (creep.getActiveBodyparts(ATTACK) < 0) {
            creep.memory.status = 'ESCAPE';
        }

        creep.moveTo(42,39);

        /*var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
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
                if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
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
            const route = Game.map.findRoute(creep.room, homeRoom);
            if (route.length > 0) {
                const exit = creep.pos.findClosestByRange(route[0].exit);
                PathFinder.use(true);
                creep.moveTo(exit);
            }
            creep.heal(creep);
        } else {

        }*/
    }
};

module.exports = creepModule;