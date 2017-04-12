var creepModule = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UNPACKING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UNPACKING';
        }
        
        if (creep.memory.status == 'PACKING') {
            if (creep.room.name == 'W88S58') {
                creep.moveTo(22, 0);
            } else if (creep.room.name == 'W88S57') {
                var container = Game.getObjectById(Memory.objectId._1ContainerUp);

                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {

            }
        } else {
            if (creep.room.name == 'W88S58') {
                var container = Game.getObjectById(Memory.objectId._1ContainerLeft);

                if (container.store[RESOURCE_ENERGY] < container.storeCapacity) {
                    if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#05ff05'}});
                    }
                } else {
                    var link = Game.getObjectById(Memory.objectId._1LinkLeft);

                    if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link, {visualizePathStyle: {stroke: '#05ff05'}});
                    }
                }
            } else if (creep.room.name == 'W88S57') {
                 creep.moveTo(22, 49);
            } else {

            }
        }
    }
};

module.exports = creepModule;