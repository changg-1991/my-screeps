var roleSoldier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        target = Game.getObjectById('58d12ac79f9ea1683142c1eb');
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            result = creep.moveTo(new RoomPosition(14, 14, 'W87S58'));
        }
    }
};

module.exports = roleSoldier;