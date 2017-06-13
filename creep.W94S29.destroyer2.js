var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'BACKWARD' && creep.hits < creep.hitsMax * 0.75) {
            creep.memory.status = 'BACKWARD';
        }
        if (creep.memory.status != 'FORWARD' && creep.hits > creep.hitsMax * 0.95) {
            creep.memory.status = 'FORWARD';
        }

        let targetRoom = '';
        let purpose = '';

        if (Game.flags.dawn_0.color == COLOR_WHITE) {
            if (creep.room.find(FIND_HOSTILE_CREEPS).length) {
                targetRoom = 'W94S28';
                purpose = 'return_1';
            } else {
                targetRoom = 'W94S28';
                purpose = 'uniting_1';
            }
        } else if (Game.flags.dawn_2.color == COLOR_WHITE) {
            targetRoom = 'W95S27';
            purpose = 'invading_2';
        } else {
            //
        }
        
        if (creep.room.name == targetRoom) {
            if (purpose == 'invading_2') {
                const tower = Game.getObjectById('593c2bbbcb74fa230f4ae700');
                const spawn = Game.getObjectById('593b23deb0ce727673f796e4');

                if (tower) {
                    var target = tower;
                } else if (spawn) {
                    var target = spawn;
                } else {
                    var target = '';
                }

                if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else if (purpose == 'uniting_1') {
                if (!creep.pos.isNearTo(Game.flags.dawn_0)) {
                    creep.moveTo(Game.flags.dawn_0);
                }
            } else if (purpose == 'return_1') {
                if (!creep.pos.isNearTo(Game.flags.home)) {
                    creep.moveTo(Game.flags.home);
                }
            } else {
                //
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
        return [
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            TOUGH,TOUGH,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE
        ];
    },

    getCount: function(roomName) {
        return 0;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;