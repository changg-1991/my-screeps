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
                var source = Game.getObjectById(Memory.objectId._1SourceSteal);
                var result = creep.harvest(source);
                if (result == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {

            }
        } else {
            if (creep.room.name == 'W88S58') {
                var link = Game.getObjectById(Memory.objectId._1LinkLeft);

                if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(link, {visualizePathStyle: {stroke: '#05ff05'}});
                }
            } else if (creep.room.name == 'W88S57') {
                var buildList = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (buildList.length > 0) {
                    if (creep.build(buildList[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(buildList[0], {visualizePathStyle: {stroke: '#09d5ff'}});
                    }
                }
            } else {

            }
        }
    }
};

module.exports = creepModule;