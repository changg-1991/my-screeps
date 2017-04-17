var creepModule = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.name == 'W88S58') {
            creep.moveTo(25, 49);
        } else if (creep.room.name == 'W88S59') {
            creep.moveTo(49, 42);
        } else if (creep.room.name == 'W87S59') {
            creep.moveTo(35, 49);
        } else if (creep.room.name == 'W87S60') {
            creep.moveTo(49, 8);
        } else if (creep.room.name == 'W86S60') {
            creep.moveTo(17, 0);
        } else if (creep.room.name == 'W86S59') {
            if(creep.room.controller) {
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        } else {
            //
        }
    }
};

module.exports = creepModule;