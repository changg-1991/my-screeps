var role2Farmer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
        }
        if (creep.memory.status != 'TRANSFERING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'TRANSFERING';
        }
        
        // 判断farmer是否处于采集状态
        if (creep.memory.status == 'HARVESTING') {
            /*var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }*/
            var container = Game.getObjectById('58de653068259520574e024c');

            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                    }
            });

            if (targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var towers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity;
                    }
                });

                if (towers.length > 0) {
                    if (creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#05ff05'}});
                    }
                } else {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#fff905'}});
                    }
                }                
            }
        }
    }
};

module.exports = role2Farmer;