var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'BACKWARD' && creep.hits < creep.hitsMax * 0.8) {
            creep.memory.status = 'BACKWARD';
        }
        if (creep.memory.status != 'FORWARD' && creep.hits > creep.hitsMax * 0.95) {
            creep.memory.status = 'FORWARD';
        }

        let targetRoom = 'W95S28';
        let purpose = 'invading_2';
        
        if (creep.room.name == targetRoom) {
            if (purpose == 'invading_2') {
                creep.moveTo(28, 6);
                /*const spawn = Game.getObjectById('593b23deb0ce727673f796e4');
                const hostileCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

                if (spawn) {
                    var target = spawn;
                } else if (hostileCreep) {
                    var target = hostileCreep;
                } else {
                    var target = '';
                }

                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }*/
            } else if (purpose == 'uniting_2') {
                if (creep.memory.status == 'BACKWARD') {
                    if (!creep.pos.isNearTo(Game.flags.unite_1)) {
                        creep.moveTo(Game.flags.unite_1);
                    }
                } else {
                    const target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
                        filter: function(object) {
                            return object.pos.y > 2;
                        }
                    });
                    if (target) {
                        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    } else {
                        if (!creep.pos.isNearTo(Game.flags.unite_1)) {
                            creep.moveTo(Game.flags.unite_1);
                        }
                    }
                }
            } else {
                if (!creep.pos.isNearTo(Game.flags.unite_0)) {
                    creep.moveTo(Game.flags.unite_0);
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
        return [TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 0;
    },

    getCreateType: function(roomName) {
        return 'timing';
    },

    getCreateDelta: function(roomName) {
        return 100;
    },
};

module.exports = creepModule;