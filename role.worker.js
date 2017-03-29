var roleWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
            var sourceChoosePool = new Array(0, 1, 1);
            creep.memory.sourceTarget = sourceChoosePool[Math.floor(Math.random() * sourceChoosePool.length)];
	    }
	    if (creep.memory.status != 'UPGRADING' && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.status = 'UPGRADING';
	    }
	    if (creep.memory.status != 'UPGRADING' && creep.carry.energy < creep.carryCapacity) {
	        creep.memory.status = 'HARVESTING';
	    }
	    
	    creep.say('W:' + creep.memory.status);
	    
        if (creep.memory.status == 'HARVESTING') {
            if (creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[creep.memory.sourceTarget]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.sourceTarget], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#fff905'}});
            }
        }
    }
};

module.exports = roleWorker;