var creepModule = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
        }
        if (creep.memory.status != 'REPAIRING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'REPAIRING';
        }
        
        // 判断repairer是否处于采集状态
        if (creep.memory.status == 'HARVESTING') {
            var storage = Game.getObjectById(Memory.objectId._2Storage);

            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        // repairer处于建造状态
        } else {
            var structures = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800) || (structure.structureType == STRUCTURE_WALL && structure.hits < 20000);
                }
            });

            if (structures.length > 0) {
                if (creep.repair(structures[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structures[0], {visualizePathStyle: {stroke: '#09d5ff'}});
                }
            } else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#fff905'}});
                }
            }
        }
    }
};

module.exports = creepModule;