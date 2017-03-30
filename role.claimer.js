var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.name == 'W88S58') {
            creep.moveTo(25, 49);
        } else if (creep.room.name == 'W88S59') {
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

module.exports = roleClaimer;