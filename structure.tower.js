var structureModule = {
    run: function(structure) {
        var closestHostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            structure.attack(closestHostile);
        } else {
            if (structure.room.name == 'W88S58' && Memory._1repairList.length > 0) {
                var structureToRepair = Game.getObjectById(Memory._1repairList.shift().id);
                structure.repair(structureToRepair);
            } else if (structure.room.name == 'W88S59' && Memory._2repairList.length > 0) {
                var structureToRepair = Game.getObjectById(Memory._2repairList.shift().id);
                structure.repair(structureToRepair);
            } else if (structure.room.name == 'W86S59' && Memory._3repairList.length > 0) {
                var structureToRepair = Game.getObjectById(Memory._3repairList.shift().id);
                structure.repair(structureToRepair);
            } else {
                //
            }
        }
    }
};

module.exports = structureModule;