var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
            var sourceChoosePool = new Array(0, 1, 1, 1);
            creep.memory.sourceTargetIndex = sourceChoosePool[Math.floor(Math.random() * sourceChoosePool.length)];
        }
        if (creep.memory.status != 'REPAIRING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'REPAIRING';
        }
        
        // 判断repairer是否处于采集状态
        if (creep.memory.status == 'HARVESTING') {
            var sources = creep.room.find(FIND_SOURCES);
            var source = sources[creep.memory.sourceTargetIndex];
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        // repairer处于修理状态
        } else {
            // 如果repairer还未被分配工作，则从修理队列中取一个structure
            if (!creep.memory.structureTargetId) {
                if (Memory.repairList.length > 0) {
                    creep.memory.structureTargetId = Memory.repairList.shift().id;
                } else {

                }
            }

            if (creep.memory.structureTargetId) {
                var structure = Game.getObjectById(creep.memory.structureTargetId);
                if ((structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax) || (structure.structureType == STRUCTURE_WALL && structure.hits < 30000)) {
                    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure, {visualizePathStyle: {stroke: '#ff2105'}});
                    }
                } else {
                    delete creep.memory.structureTargetId;
                }
            } else {

            }
        }
    }
};

module.exports = roleRepairer;