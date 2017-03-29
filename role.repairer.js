var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
            var sourceChoosePool = new Array(0, 1, 1);
            creep.memory.sourceTarget = sourceChoosePool[Math.floor(Math.random() * sourceChoosePool.length)];
	    }
	    if (creep.memory.status != 'REPAIRING' && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.status = 'REPAIRING';
	    }
	    if (creep.memory.status != 'REPAIRING' && creep.carry.energy < creep.carryCapacity) {
	        creep.memory.status = 'HARVESTING';
	    }
	    
	    creep.say('R:' + creep.memory.status);
	    
	    // 判断repairer是否处于采集状态
        if (creep.memory.status == 'HARVESTING') {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[creep.memory.sourceTarget]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourceTarget], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        // repairer处于修理状态
        } else {
            // 如果worker还未被分配工作，则从修理队列中取一个structure的id
            //console.log(creep.name + ' prepare to repair ' + creep.memory.repairing + ', repaire list length: ' + Object.keys(Memory.repairList).length);
	        if (!creep.memory.repairing) {
	            for (var structureId in Memory.repairList) {
	                if (Memory.repairList[structureId] == 0) {
	                    creep.memory.repairing = structureId;
	                    Memory.repairList[structureId] = 1;
                        break;
	                }
	            }
	        }
	        //console.log(creep.name + ' ready to repair ' + creep.memory.repairing + ', repaire list length: ' + Object.keys(Memory.repairList).length);

            var target = Game.getObjectById(creep.memory.repairing);
            // 判断该structure是否修理完成，如果是wall的话就把hits修到30k
            if (target != null && ((target.structureType != STRUCTURE_WALL && target.hits < target.hitsMax) || (target.structureType == STRUCTURE_WALL && target.hits < 30000))) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ff2105'}});
                }
            // 建造完成还回worker池
            } else {
                var targetId = creep.memory.repairing;
                delete creep.memory.repairing;
                creep.memory.role = 'worker';
                for (var structureId in Memory.repairList) {
	                if (structureId == targetId) {
	                    delete Memory.repairList[structureId];
                        break;
	                }
	            }
	            Memory.repairerCount -= 1;
            }
        }
    }
};

module.exports = roleRepairer;