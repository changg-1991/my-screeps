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
            if (structure.room.name == 'W88S58' && Memory._1RepairList.length > 0) {
                var structureToRepair = Game.getObjectById(Memory._1RepairList.shift().id);
                structure.repair(structureToRepair);
            } else if (structure.room.name == 'W88S59' && Memory._2RepairList.length > 0) {
                var structureToRepair = Game.getObjectById(Memory._2RepairList.shift().id);
                structure.repair(structureToRepair);
            } else if (structure.room.name == 'W86S59' && Memory._3RepairList.length > 0) {
                var structureToRepair = Game.getObjectById(Memory._3RepairList.shift().id);
                structure.repair(structureToRepair);
            } else {
                //
            }
        }
    }
};

module.exports = structureModule;