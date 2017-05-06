var creepModule = {
    body: [WORK,CARRY,CARRY,MOVE,MOVE,MOVE],
    count: 3,
    ccreateType: 'timing',
    createDelta: 500,

    run: function(creep) {
        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
        }
        if (creep.memory.status != 'BUILDING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'BUILDING';
        }

        if (creep.memory.status == 'HARVESTING') {
            let targetRoom = 'W99S24';

            if (creep.room.name == targetRoom) {
                var source = Game.getObjectById(Memory.objectId.W99S25_sourceUpUp);
                var result = creep.harvest(source);
                if (result == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
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
            let targetRoom = 'W99S25';

            if (creep.room.name == targetRoom) {
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
                    var container = Game.getObjectById(Memory.objectId.W99S25_container);
                    if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#05ff05'}});
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
        }

        
    }
};

module.exports = creepModule;