var structureModule = {
    run: function(structure) {
        var closestHostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            structure.attack(closestHostile);
        } else if (Memory.repairList.length > 0 && structure.room.name == 'W88S58') {
            var structureToRepair = Game.getObjectById(Memory.repairList.shift().id);
            structure.repair(structureToRepair);
        }
    }
};

module.exports = structureModule;