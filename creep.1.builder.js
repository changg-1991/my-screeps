var creepModule = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
        }
        if (creep.memory.status != 'BUILDING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'BUILDING';
        }
        
        // 判断builder是否处于采集状态
        if (creep.memory.status == 'HARVESTING') {
            if (creep.room.name == 'W88S58') {
                var storage = Game.getObjectById(Memory.objectId._1Storage);

                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if (creep.room.name == 'W88S57') {
                creep.moveTo(22, 49);
            } else {

            }
        // builder处于建造状态
        } else {
            if (Memory._1BuildList.length > 0) {
                var constructionSite = Game.getObjectById(Memory._1BuildList[0].id);
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#09d5ff'}});
                }
            } else {
                if (creep.room.name == 'W88S58') {
                    creep.moveTo(22, 0);
                } else if (creep.room.name == 'W88S57') {
                    var buildList = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (buildList.length > 0) {
                        var constructionSite = Game.getObjectById(buildList[0].id);
                        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#09d5ff'}});
                        }
                    }
                } else {

                }
            }
        }
    }
};

module.exports = creepModule;