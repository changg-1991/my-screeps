var creepModule = {
    body: [TOUGH,ATTACK,MOVE,MOVE],
    count: 1,
    createType: 'counting',

    run: function(creep) {
        let startRoom = 'W98S23';
        let endRoom = 'W96S23';

        if (creep.room.name == startRoom) {
            creep.memory.status = 'GOING';
        }

        if (creep.room.name == endRoom) {
            creep.memory.status = 'COMMING';
        }

        if (creep.memory.status == 'GOING') {
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function(object) {
                    return Memory.ally.indexOf(object.owner) == -1;
                }
            });

            if (closestHostile) {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                const route = Game.map.findRoute(creep.room, endRoom);
                if (route.length > 0) {
                    const exit = creep.pos.findClosestByRange(route[0].exit);
                    PathFinder.use(true);
                    creep.moveTo(exit);
                }
            }
        } else {
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function(object) {
                    return Memory.ally.indexOf(object.owner) == -1;
                }
            });

            if (closestHostile) {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
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
    }
};

module.exports = creepModule;