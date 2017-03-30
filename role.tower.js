var roleTower = {
    run: function(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        } else if (Memory.repairList.length > 0) {
            var structure = Game.getObjectById(Memory.repairList.shift().id);
            tower.repair(structure);
        }
    }
};

module.exports = roleTower;