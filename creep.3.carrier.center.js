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
            var link = Game.getObjectById(Memory.objectId._3LinkCenter);

            if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(34, 26);
            }
        } else {
            var storage = Game.getObjectById(Memory.objectId._3Storage);
            
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#05ff05'}});
            }
        }
    }
};

module.exports = creepModule;