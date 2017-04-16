var creepModule = {

    run: function(creep) {
        // 确定当前digger的状态
        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
        }
        if (creep.memory.status != 'TRANSFERING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'TRANSFERING';
        }

        if (creep.memory.status == 'HARVESTING') {
            var source = Game.getObjectById(Memory.objectId._2Source);
            var result = creep.harvest(source);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(9, 21);
            }
        } else {
            var container = Game.getObjectById(Memory.objectId._2ContainerLeft);

            if (container.store[RESOURCE_ENERGY] < container.storeCapacity) {
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#05ff05'}});
                }
            } else {
                var link = Game.getObjectById(Memory.objectId._2LinkLeft);

                if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(link, {visualizePathStyle: {stroke: '#05ff05'}});
                }
            }
        }
    }
};

module.exports = creepModule;