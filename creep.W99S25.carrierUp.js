var creepModule = {
    body: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
    count: 2,
    createType: 'counting',

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UPGRADING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UPGRADING';
        }

        if (creep.memory.status == 'PACKING') {
            var pos = new RoomPosition(13, 4, 'W99S25');
            var target = pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if (target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
            });

            if (target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var storage = Game.getObjectById(Memory.objectId.W99S25_storage);
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#05ff05'}});
                }
            }
        }
    }
};

module.exports = creepModule;