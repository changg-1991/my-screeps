var structureModule = {
    run: function(structure) {
        var closestHostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return Memory.ally.indexOf(object.owner) == -1 && object.pos.x < 40;
            }
        });

        if (!Memory.towerTarget[structure.id]) {
            if (closestHostile) {
                Memory.towerTarget[structure.id] = closestHostile;
            }
        } else {
            if (!Game.getObjectById(Memory.towerTarget[structure.id].id)) {
                if (closestHostile) {
                    Memory.towerTarget[structure.id] = closestHostile;
                } else {
                    delete Memory.towerTarget[structure.id];
                }
            }
        }

        if (Memory.towerTarget[structure.id]) {
            structure.attack(Game.getObjectById(Memory.towerTarget[structure.id].id));
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