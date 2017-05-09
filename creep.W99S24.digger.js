var creepModule = {
    body: [WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],
    count: 1,
    createType: 'timing',
    createDelta: 1500,

    run: function(creep) {
        let targetRoom = 'W99S24';
        if (creep.room.name == targetRoom) {
            var source = Game.getObjectById(Memory.objectId.W99S24_source);
            var result = creep.harvest(source);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            const route = Game.map.findRoute(creep.room, targetRoom);
            if (route.length > 0) {
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);
            }
        }
    }
};

module.exports = creepModule;