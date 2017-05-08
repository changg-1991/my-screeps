var creepModule = {
    body: [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],
    count: 1,
    createType: 'counting',

    run: function(creep) {
        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
        }
        if (creep.memory.status != 'TRANSFERING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'TRANSFERING';
        }

        if (creep.memory.status == 'HARVESTING') {
            var source = Game.getObjectById(Memory.objectId.W99S21_sourceDown);
            var result = creep.harvest(source);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            var link = Game.getObjectById(Memory.objectId.W99S21_linkLeft);
            if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, {visualizePathStyle: {stroke: '#05ff05'}});
            }
        }
    }
};

module.exports = creepModule;