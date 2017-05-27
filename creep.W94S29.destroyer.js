var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'BACKWARD' && creep.hits < creep.hitsMax * 0.8) {
            creep.memory.status = 'BACKWARD';
        }
        if (creep.memory.status != 'FORWARD' && creep.hits > creep.hitsMax * 0.95) {
            creep.memory.status = 'FORWARD';
        }

        let targetRoom = '';
        let purpose = '';

        if (Game.flags.unite_0.color == COLOR_WHITE) {
            targetRoom = 'W94S29';
            purpose = 'uniting_1';
        } else if (Game.flags.unite_1.color == COLOR_WHITE) {
            if (creep.memory.status == 'BACKWARD') {
                targetRoom = 'W92S29';
                purpose = 'uniting_2';
            } else {
                targetRoom = 'W92S28';
                purpose = 'invading_1';
            }
            
        } else if (Game.flags.unite_2.color == COLOR_WHITE) {
            targetRoom = 'W92S28';
            purpose = 'invading_2';
        } else {
            //
        }
        
        if (creep.room.name == targetRoom) {
            if (purpose == 'invading_2') {
                const spawn = Game.getObjectById('591912937a11b8c4556cfad4');
                const extensions = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                    filter: { structureType: STRUCTURE_EXTENSION }
                });

                if (extensions.length > 0) {
                    var target = extensions[0];
                } else if (spawn) {
                    var target = spawn;
                } else {
                    var target = '';
                }

                if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else if (purpose == 'invading_1') {
                if (!creep.pos.isNearTo(Game.flags.point_1)) {
                    creep.moveTo(Game.flags.point_1);
                } else if (!creep.pos.isNearTo(Game.flags.point_2)) {
                    creep.moveTo(Game.flags.point_2);
                } else if (!creep.pos.isNearTo(Game.flags.point_3)) {
                    creep.moveTo(Game.flags.point_3);
                } else {
                    //
                }
            } else if (purpose == 'uniting_2') {
                if (!creep.pos.isNearTo(Game.flags.unite_1)) {
                    creep.moveTo(Game.flags.unite_1);
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
        return [TOUGH,TOUGH,TOUGH,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    },

    getCount: function(roomName) {
        if (Game.time >  19401552 + 1000) {
            return 0;
        } else {
            return 0;
        }
    },

    getCreateType: function(roomName) {
        return 'timing';
    },

    getCreateDelta: function(roomName) {
        return 600;
    },
};

module.exports = creepModule;