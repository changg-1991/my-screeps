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
            if (room.find(FIND_HOSTILE_CREEPS).length) {
                targetRoom = 'W94S29';
                purpose = 'return_1';
            } else {
                targetRoom = 'W94S29';
                purpose = 'uniting_1';
            }
        } else if (Game.flags.dawn_1.color == COLOR_WHITE) {
            if (creep.memory.status == 'BACKWARD') {
                targetRoom = 'W94S29';
                purpose = 'uniting_1';
            } else {
                targetRoom = 'W94S28';
                purpose = 'invading_1';
            }
        } else if (Game.flags.dawn_2.color == COLOR_WHITE) {
            targetRoom = 'W94S28';
            purpose = 'invading_2';
        } else {
            //
        }
        
        if (creep.room.name == targetRoom) {
            if (purpose == 'invading_2') {
                const rampart = Game.getObjectById('5922700bb8b50c362ce9d48d');
                const tower1 = Game.getObjectById('591f51ec00512a601233348f');
                const tower2 = Game.getObjectById('591542c571d3769f2ccd3c94');
                const storage = Game.getObjectById('5918e534d38877d178e04122');
                const extensions = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                    filter: { structureType: STRUCTURE_EXTENSION }
                });

                if (rampart) {
                    var target = rampart;
                } else if (tower1) {
                    var target = tower1;
                } else if (tower2) {
                    var target = tower2;
                } else if (storage) {
                    var target = storage;
                } else if (extensions.length > 0) {
                    var target = extensions[0];
                } else {
                    var target = '';
                }

                if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else if (purpose == 'invading_1') {
                //
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
        return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
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