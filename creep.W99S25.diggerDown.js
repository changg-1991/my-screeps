var creepModule = {
    body: [WORK,WORK,MOVE],
    count: 1,
    createType: 'counting',

    run: function(creep) {
        var source = Game.getObjectById(Memory.objectId.W99S25_sourceDown);
        var result = creep.harvest(source);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};

module.exports = creepModule;