var creepModule = {
    body: [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
    count: 2,
    createType: 'counting',
    
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
            var container = Game.getObjectById(Memory.objectId._3Container);
        
            if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#05ff05'}});
            }
        }
    }
};

module.exports = creepModule;