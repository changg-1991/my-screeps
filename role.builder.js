var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
            var sourceChoosePool = new Array(0, 1, 1);
            creep.memory.sourceTarget = sourceChoosePool[Math.floor(Math.random() * sourceChoosePool.length)];
	    }
	    if (creep.memory.status != 'BUILDING' && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.status = 'BUILDING';
	    }
	    if (creep.memory.status != 'BUILDING' && creep.carry.energy < creep.carryCapacity) {
	        creep.memory.status = 'HARVESTING';
	    }
	    
	    creep.say('B:' + creep.memory.status);
	    
	    // 判断builder是否处于采集状态
	    if (creep.memory.status == 'HARVESTING') {
	        var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[creep.memory.sourceTarget]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourceTarget], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        // builder处于建造状态
	    } else {
	        // 如果worker还未被分配工作，则从建造队列中取一个construction_site的id
	        if (!creep.memory.building) {
	            for (var constructionSiteId in Memory.buildList) {
	                if (Memory.buildList[constructionSiteId] == 0) {
	                    creep.memory.building = constructionSiteId;
	                    Memory.buildList[constructionSiteId] = 1;
                        break;
	                }
	            }
	        }

            var target = Game.getObjectById(creep.memory.building);
            // 判断该construction_site是否被建造完成
            if (target != null && !target.hits) {
                //var targetType = target.structureType;
                //var targetPosition = target.pos;
                var result = creep.build(target);
                if (result == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#09d5ff'}});
                } else if (result == OK) {
                    //TODO:如果修建的是墙，则立刻将builder转化repairer
                    //if (targetType == STRUCTURE_WALL) {
                    //
                    //}
                } else {
                    //
                }
            // 建造完成还回worker池
            } else {
                var targetId = creep.memory.building;
                delete creep.memory.building;
                creep.memory.role = 'worker';
                for (var constructionSiteId in Memory.buildList) {
	                if (constructionSiteId == targetId) {
	                    delete Memory.buildList[constructionSiteId];
                        break;
	                }
	            }
	            Memory.builderCount -= 1;
            }
	    }
	}
};

module.exports = roleBuilder;