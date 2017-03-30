var roleSecurity = {
    run: function(creep) {
        if (creep.room.name == 'W88S58') {
            creep.moveTo(12, 49);
        } else if (creep.room.name == 'W88S59') {
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostile);
                }
            }
        } else {
            //
        }
    }
};

module.exports = roleSecurity;