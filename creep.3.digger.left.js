var creepModule = {

    run: function(creep) {
        var source = Game.getObjectById(Memory.objectId._3SourceLeft);
        var result = creep.harvest(source);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};

module.exports = creepModule;