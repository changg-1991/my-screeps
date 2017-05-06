var creepModule = {
    body: [WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
    count: 2,
    ccreateType: 'timing',
    createDelta: 750,

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UNPACKING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UNPACKING';
        }

        if (creep.memory.status == 'PACKING') {
            let targetRoom = 'W99S22';

            if (creep.room.name == targetRoom) {
                var pos = new RoomPosition(32, 18, 'W99S22');
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
                    PathFinder.use(true);
                    creep.moveTo(exit);
                }
            }
        } else {
            let targetRoom = 'W99S21';

            if (creep.room.name == targetRoom) {
                var storage = Game.getObjectById(Memory.objectId.W99S21_storage);
        
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#05ff05'}});
                }
            } else {
                var constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

                if (constructionSite) {
                    if (creep.build(constructionSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#05ff05'}});
                    }
                } else {
                    const found = creep.pos.lookFor(LOOK_STRUCTURES);
                    if (found.length && found[0].hits < found[0].hitsMax * 0.9 && found[0].hitsMax - found[0].hits > 800) {
                        creep.repair(found[0]);
                    }

                    const route = Game.map.findRoute(creep.room, targetRoom);
                    if (route.length > 0) {
                        const exit = creep.pos.findClosestByRange(route[0].exit);
                        PathFinder.use(true);
                        creep.moveTo(exit);
                    }
                }
            }
        }

        
    }
};

module.exports = creepModule;