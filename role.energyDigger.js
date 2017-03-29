var roleEnergyDigger = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // 给energyDigger分配工作
        if (creep.memory.sourceTarget == null) {
            for (var source in Memory.sourceList) {
                if (Memory.sourceList[source] == 0) {
                    creep.memory.sourceTarget = source;
                    Memory.sourceList[source] = 1;
                    break;
                }
            }
        }

        // 确定当前energyDigger的状态
        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
        }
        if (creep.memory.status != 'TRANSFERING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'TRANSFERING';
        }

        if (creep.memory.status == 'HARVESTING') {
            var source = Game.getObjectById(creep.memory.sourceTarget);
            var result = creep.harvest(source);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER;
                }
            });

            if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#05ff05'}});
            }
        }
    }
};

module.exports = roleEnergyDigger;