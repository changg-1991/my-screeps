var creepModule = {
    body: [WORK,WORK,CARRY,MOVE],
    count: 1,
    createType: 'timing',
    createDelta: 1500,

    run: function(creep) {
        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
        }
        if (creep.memory.status != 'REPAIRING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'REPAIRING';
        }

        if (creep.memory.status == 'HARVESTING') {
            if (creep.room.name == 'W88S58') {
                creep.moveTo(22, 0);
            } else if (creep.room.name == 'W88S57') {
                var source = Game.getObjectById(Memory.objectId._1SourceSteal);
                var result = creep.harvest(source);
                if (result == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {

            }
        } else {
            if (creep.room.name == 'W88S58') {
                creep.moveTo(22, 0);
            } else if (creep.room.name == 'W88S57') {
                var structures = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 100;
                    }
                });

                if (structures.length > 0) {
                    if (creep.repair(structures[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structures[0], {visualizePathStyle: {stroke: '#09d5ff'}});
                    }
                } else {
                    creep.moveTo(21, 44);
                }
            } else {

            }
        }
    }
};

module.exports = creepModule;