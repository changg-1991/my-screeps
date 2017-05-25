var creepModule = {

    run: function(creep) {
        let targetRoom = '';
        let purpose = '';

        if (creep.hits < creep.hitsMax * 0.8) {
            Game.flags.unite_1.setColor(COLOR_WHITE);
        } else {
            if (Game.flags.unite_1.color == COLOR_WHITE) {
                Game.flags.unite_1.setColor(COLOR_WHITE, COLOR_CYAN);
            }
        }

        if (Game.flags.unite_0.color == COLOR_WHITE) {
            targetRoom = 'W94S29';
            purpose = 'uniting_1';
        } else if (Game.flags.unite_1.color == COLOR_WHITE) {
            targetRoom = 'W92S29';
            purpose = 'uniting_2';
        } else if (Game.flags.unite_2.color == COLOR_CYAN) {
            targetRoom = 'W92S28';
            purpose = 'invading_2';
        } else {
            //
        }
        
        if (creep.room.name == targetRoom) {
            if (purpose == 'invading_2') {
                if (!creep.pos.isNearTo(Game.flags.point_1)) {
                    creep.moveTo(Game.flags.point_1);
                } else {
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
                }
            } else if (purpose == 'uniting_2') {
                const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function(object) {
                        return object.hits < object.hitsMax;
                    }
                });

                if (target) {
                    if(creep.heal(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else {
                    if (!creep.pos.isNearTo(Game.flags.unite_1)) {
                        creep.moveTo(Game.flags.unite_1);
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
        }
    },

    getBody: function(roomName) {
        return [TOUGH,TOUGH,TOUGH,TOUGH,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 1;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;