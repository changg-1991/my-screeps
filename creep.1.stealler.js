var creepModule = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
        }
        if (creep.memory.status != 'TRANSFERING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'TRANSFERING';
        }

        if (creep.memory.status == 'HARVESTING') {
            if (creep.room.name == 'W88S58') {
                creep.moveTo(22, 0);
            } else if (creep.room.name == 'W88S57') {
                var source = Game.getObjectById('5873bb8a11e3e4361b4d6028');
                var result = creep.harvest(source);
                if (result == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {

            }
        } else {
            if (creep.room.name == 'W88S58') {
                var link = Game.getObjectById('58e5981373632c3f3c64ff53');

                if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(link, {visualizePathStyle: {stroke: '#05ff05'}});
                }
            } else if (creep.room.name == 'W88S57') {
                var structures = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.hits < structure.hitsMax * 0.5;
                    }
                });
                if (structures.length > 0) {
                    if (creep.repair(structures[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structures[0], {visualizePathStyle: {stroke: '#09d5ff'}});
                    }
                } else {
                    creep.moveTo(22, 49);
                }
            } else {

            }
        }
    }
};

module.exports = creepModule;