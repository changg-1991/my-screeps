var creepModule = {
    body: [TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL],
    count: 2,
    createType: 'counting',

    run: function(creep) {
        var startRoom = 'W98S23';
        var endRoom = 'W98S25';

        if (creep.room.name == startRoom) {
            creep.memory.status = 'GOING';
        }

        if (creep.room.name == endRoom) {
            creep.memory.status = 'COMMING';
        }

        if (creep.getActiveBodyparts(ATTACK) == 0) {
            creep.memory.status = 'ESCAPE';
        }

        if (creep.memory.status == 'ESCAPE' && creep.hits == creep.hitsMax) {
            creep.memory.status = 'GOING';
        }

        //creep.moveTo(33,45);

        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return Memory.ally.indexOf(object.owner) == -1 && creep.getActiveBodyparts(ATTACK) > 0 && creep.getActiveBodyparts(RANGED_ATTACK) > 0 && creep.getActiveBodyparts(HEAL) > 0;
            }
        });

        var spawn = creep.room.find(FIND_STRUCTURES, {
            filter: function(object) {
                return structure.structureType == STRUCTURE_SPAWN;
            }
        });

        if (creep.memory.status == 'GOING') {
            if (closestHostile) {
                if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostile);
                }
            } else {
                const route = Game.map.findRoute(creep.room, endRoom);
                if (route.length > 0) {
                    const exit = creep.pos.findClosestByRange(route[0].exit);
                    PathFinder.use(true);
                    creep.moveTo(exit);
                }
            }
            creep.heal(creep);
        } else if (creep.memory.status == 'COMMING') {
            if (spawn) {
                if(creep.attack(spawn) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn);
                }
            } else {
                if (closestHostile) {
                    if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestHostile);
                    }
                } else {
                    const route = Game.map.findRoute(creep.room, startRoom);
                    if (route.length > 0) {
                        const exit = creep.pos.findClosestByRange(route[0].exit);
                        PathFinder.use(true);
                        creep.moveTo(exit);
                    }
                }
            }
            creep.heal(creep);
        } else if (creep.memory.status == 'ESCAPE') {
            if (closestHostile) {
                const range = creep.pos.getRangeTo(closestHostile);
                if (range > 3) {
                    creep.heal(creep);
                } else {
                    const route = Game.map.findRoute(creep.room, startRoom);
                    if (route.length > 0) {
                        const exit = creep.pos.findClosestByRange(route[0].exit);
                        PathFinder.use(true);
                        creep.moveTo(exit);
                    }
                }
            } else {
                creep.heal(creep);
            }
        } else {

        }
    }
};

module.exports = creepModule;