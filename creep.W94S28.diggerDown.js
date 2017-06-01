var creepModule = {

    run: function(creep) {
        let targetRoom = 'W94S28';
        if (creep.room.name == targetRoom) {
            var source = Game.getObjectById(Memory.objectId.W94S28_sourceDown);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {
                    costCallback: function(roomName, costMatrix) {
                        if (roomName == 'W94S28') {
                            costMatrix.set(14, 45, 0);
                        }
                    }
                });
            }
        } else {
            creep.moveTo(23, 0);
        }
    },

    getBody: function(roomName) {
        return [WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 1;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;