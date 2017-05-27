var creepModule = {

    run: function(creep) {
        let targetRoom = '';
        let purpose = '';

        if (Game.flags.dawn_0.color == COLOR_WHITE || Game.flags.dawn_1.color == COLOR_WHITE) {
            if (creep.room.find(FIND_HOSTILE_CREEPS).length) {
                targetRoom = 'W94S29';
                purpose = 'return_1';
            } else {
                targetRoom = 'W94S29';
                purpose = 'uniting_1';
            }
        } else if (Game.flags.dawn_2.color == COLOR_WHITE) {
            targetRoom = 'W94S28';
            purpose = 'invading_1';
        } else {
            //
        }
        
        if (creep.room.name == targetRoom) {
            if (purpose == 'invading_1') {
                const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function(object) {
                        return object.hits < object.hitsMax;
                    }
                });
                if (target) {
                    if(creep.heal(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            } else if (purpose == 'uniting_1') {
                if (!creep.pos.isEqualTo(Game.flags.dawn_0)) {
                    creep.moveTo(Game.flags.dawn_0);
                } else {
                    if (creep.hits < creep.hitsMax * 0.95) {
                        creep.heal(creep);
                    } else {
                        const targets = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
                            filter: function(object) {
                                return object.hits < object.hitsMax;
                            }
                        });
                        if (targets.length > 0) {
                            creep.heal(targets[0]);
                        }
                    }
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
        return [HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 1;
    },

    getCreateType: function(roomName) {
        return 'timing';
    },

    getCreateDelta: function(roomName) {
        return 1500;
    },
};

module.exports = creepModule;