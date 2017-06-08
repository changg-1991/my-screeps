var creepModule = {

    run: function(creep) {
        let targetRoom = 'W91S28';

        if (creep.room.name == targetRoom) {
            const hostileCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

            if (creep.attack(hostileCreep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostileCreep);
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
        return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,ATTACK];
    },

    getCount: function(roomName) {
        return 1;
    },

    getCreateType: function(roomName) {
        return 'timing';
    },

    getCreateDelta: function(roomName) {
        return 1400;
    },
};

module.exports = creepModule;