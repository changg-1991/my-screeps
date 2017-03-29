var roleArtillery = {

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
	    
	    creep.say('A:' + creep.memory.status);
	    
	    if (creep.memory.status == 'HARVESTING') {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[creep.memory.sourceTarget]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourceTarget], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            if (!creep.memory.transfering) {
                var tower = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity;
                    }
                });
                if (tower.length > 0) {
                    creep.memory.transfering = tower[0].id;
                }
	            
	        }
            
            var target = Game.getObjectById(creep.memory.transfering);
            if (target != null && target.energy < target.energyCapacity) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#05ff05'}});
                } else {
                    delete creep.memory.transfering;
                }
            } else {
                delete creep.memory.transfering;
                creep.memory.role = 'farmer';
	            Memory.artilleryCount -= 1;
            }
        }
	}
};

module.exports = roleArtillery;