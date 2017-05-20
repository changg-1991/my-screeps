var creepModule = {

    run: function(creep) {
        let targetRoom = 'W95S29';
        if (creep.room.name == targetRoom) {
            var source = Game.getObjectById(Memory.objectId.W95S29_source);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
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
        return [WORK,WORK,WORK,MOVE,MOVE,MOVE];
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