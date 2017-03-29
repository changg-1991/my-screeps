var roleFarmer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
            var sourceChoosePool = new Array(0, 1, 1);
            creep.memory.sourceTarget = sourceChoosePool[Math.floor(Math.random() * sourceChoosePool.length)];
	    }
	    if (creep.memory.status != 'TRANSFERING' && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.status = 'TRANSFERING';
	    }
	    
	    creep.say('F:' + creep.memory.status);
	    
	    if (creep.memory.status == 'HARVESTING') {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[creep.memory.sourceTarget]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourceTarget], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            // 寻找有没有没有满能量的extension，不再给Spawn充能，因为Spawn可以自己产生能量
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity;
                }
            });
            
            if (!creep.memory.transfering && target != null) {
                creep.memory.transfering = target.id;
            }
            
            if (creep.memory.transfering) {
                var target = Game.getObjectById(creep.memory.transfering);
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#05ff05'}});
                } else {
                    delete creep.memory.transfering;
                }
            } else {
                creep.moveTo(26, 5);
            }
        }
	}
};

module.exports = roleFarmer;