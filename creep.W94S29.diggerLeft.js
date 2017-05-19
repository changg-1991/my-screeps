var creepModule = {

    run: function(creep) {
        var source = Game.getObjectById(Memory.objectId.W94S29_sourceLeft);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    },

    getBody: function(roomName) {
        return [WORK,WORK,WORK,WORK,MOVE];
    },

    getCount: function(roomName) {
        return 1;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;