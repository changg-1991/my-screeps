var structureModule = {
    run: function(structure) {
        if (structure.room.name == 'W98S23') {
            var closestHostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function(object) {
                    return Memory.ally.indexOf(object.owner) == -1 && (object.pos.x < 40 || (object.pos.x == 45 && object.pos.y == 1) || (object.pos.x == 45 && object.pos.y == 2));
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
        } else if (structure.room.name == 'W99S25') {
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
        } else {
            var closestHostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function(object) {
                    return Memory.ally.indexOf(object.owner) == -1;
                }
            });

            Memory.towerTarget[structure.id] = closestHostile;
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