var creepModule = {
    run: function(creep) {
        if (creep.room.name == 'W88S58') {
            creep.moveTo(12, 49);
        } else if (creep.room.name == 'W88S59') {
            creep.moveTo(49, 42);
        } else if (creep.room.name == 'W87S59') {
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostile);
                }
            } else {
                closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
                if (closestHostile) {
                    if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestHostile);
                    }
                }
            }
        } else {
            //
        }
    }
};

module.exports = creepModule;