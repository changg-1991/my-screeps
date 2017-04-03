var role2Upgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UPGRADING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UPGRADING';
        }
        
        if (!creep.memory.renewing && creep.ticksToLive < 500){
            creep.memory.renewing = true;
        }
        if (creep.memory.renewing && creep.ticksToLive >= 1000) {
            creep.memory.renewing = false;
        }
        
        if (creep.memory.renewing) {
            if (Game.spawns['Spawn2'].renewCreep(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn2']);
            }
        } else {
            if (creep.memory.status == 'PACKING') {
                var container = Game.getObjectById('58de653068259520574e024c');

                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#fff905'}});
                }
            }
        }
    }
};

module.exports = role2Upgrader;