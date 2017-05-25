var creepModule = {

    run: function(creep) {
        let targetRoom = '';
        let purpose = '';

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
                const tower = Game.getObjectById('591c18872997ca4aaef3a1e9');
                const storage = Game.getObjectById('5920c7599f4763c41fe0349d');
                const spawn = Game.getObjectById('591912937a11b8c4556cfad4');
                const extensions = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                    filter: { structureType: STRUCTURE_EXTENSION }
                });
                const hostileCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

                if (tower) {
                    var target = tower;
                } else if (hostileCreep) {
                    var target = hostileCreep;
                } else if (extensions.length > 0) {
                    var target = extensions[0];
                } else if (storage) {
                    var target = storage;
                } else if (spawn) {
                    var target = spawn;
                } else {
                    var target = '';
                }

                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else if (purpose == 'uniting_2') {
                if (creep.hits < creep.hitsMax * 0.8) {
                    if (!creep.pos.isNearTo(Game.flags.unite_1)) {
                        creep.moveTo(Game.flags.unite_1);
                    }
                } else {
                    const target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
                    if (target) {
                        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
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
        return [TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 2;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;