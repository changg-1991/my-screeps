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
            if (structure.room.name == 'W98S23' && Memory.W98S23_repairList.length > 0) {
                var structureToRepair = Game.getObjectById(Memory.W98S23_repairList.shift().id);
                structure.repair(structureToRepair);
            } else {
                //
            }
        }
    }
};

module.exports = structureModule;