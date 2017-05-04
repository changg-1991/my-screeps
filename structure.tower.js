var structureModule = {
    run: function(structure) {
        var closestHostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return Memory.ally.indexOf(object.owner) == -1;
            }
        });

        if (closestHostile) {
            structure.attack(closestHostile);
        } else {
            if (Memory[structure.room.name + '_repairList'].length > 0) {
                var structureToRepair = Game.getObjectById(Memory[structure.room.name + '_repairList'].shift().id);
                structure.repair(structureToRepair);
            } else {
                //
            }
        }
    }
};

module.exports = structureModule;