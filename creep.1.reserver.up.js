var creepModule = {
    body: [CLAIM,CLAIM,MOVE,MOVE],
    count: 1,
    createType: 'timing',
    createDelta: 800,

    run: function(creep) {
        if (creep.room.name == 'W88S58') {
            creep.moveTo(22, 0);
        } else if (creep.room.name == 'W88S57') {
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {

        }
    }
};

module.exports = creepModule;