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
            var container = Game.getObjectById('58de653068259520574e024c');
            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            var container = Game.getObjectById('58e1c63055d00e8359a2d41e');
            var result = creep.transfer(container, RESOURCE_ENERGY);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = creepModule;