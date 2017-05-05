var creepModule = {
    body: [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
    count: 1,
    createType: 'timing',
    createDelta: 1500,
    
    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UNPACKING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UNPACKING';
        }
        
        if (creep.memory.status == 'PACKING') {
            var pos = new RoomPosition(15, 20, 'W98S23');
            var target = pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if (target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {
            var storage = Game.getObjectById(Memory.objectId.W98S23_storage);
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#05ff05'}});
            }
        }
    }
};

module.exports = creepModule;