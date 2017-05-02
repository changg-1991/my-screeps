var creepModule = {
    body: [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
    count: 1,
    createType: 'counting',
    
    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UNPACKING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UNPACKING';
        }
        
        if (creep.memory.status == 'PACKING') {
            let targetRoom = 'W97S23';

            if (creep.room.name == targetRoom) {
                var pos = new RoomPosition(10, 21, 'W97S23');
                var target = pos.findClosestByRange(FIND_DROPPED_ENERGY);
                if (target) {
                    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            } else {
                const route = Game.map.findRoute(creep.room, targetRoom);
                if (route.length > 0) {
                    const exit = creep.pos.findClosestByRange(route[0].exit);
                    creep.moveTo(exit);
                }
            }
        } else {
            let targetRoom = 'W98S23';

            if (creep.room.name == targetRoom) {
                var pos = new RoomPosition(26, 30, 'W98S23');
                if(creep.pos != pos) {
                    creep.moveTo(26, 30);
                } else {
                    creep.drop(RESOURCE_ENERGY);
                }
            } else {
                const route = Game.map.findRoute(creep.room, targetRoom);
                if (route.length > 0) {
                    const exit = creep.pos.findClosestByRange(route[0].exit);
                    creep.moveTo(exit);
                }
            }
        }
    }
};

module.exports = creepModule;