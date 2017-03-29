var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
            var sourceChoosePool = new Array(0, 1, 1, 1);
            creep.memory.sourceTargetIndex = sourceChoosePool[Math.floor(Math.random() * sourceChoosePool.length)];
        }
        if (creep.memory.status != 'BUILDING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'BUILDING';
        }
        
        // 判断builder是否处于采集状态
        if (creep.memory.status == 'HARVESTING') {
            var sources = creep.room.find(FIND_SOURCES);
            var source = sources[creep.memory.sourceTargetIndex];
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        // builder处于建造状态
        } else {
            if (Memory.buildList.length > 0) {
                var constructionSite = Memory.buildList[0];
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#09d5ff'}});
                }
            } else {
                //
            }
        }
    }
};

module.exports = roleBuilder;