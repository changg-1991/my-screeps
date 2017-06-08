var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UNPACKING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UNPACKING';
        }

        if (creep.memory.status == 'PACKING') {
            let targetRoom = 'W93S28';
            if (creep.room.name == targetRoom) {
                var pos = new RoomPosition(33, 28, 'W93S28');
                var target = pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: function(object) {
                        return object.resourceType == RESOURCE_ENERGY;
                    }
                });
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
            let targetRoom = 'W92S28';
            if (creep.room.name == targetRoom) {
                var storage = Game.getObjectById(Memory.objectId.W92S28_storage);
                if (storage) {
                    if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage);
                    }
                }
            } else {
                var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

                if (constructionSite) {
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite);
                    }
                } else {
                    const found = creep.pos.lookFor(LOOK_STRUCTURES);
                    if (found.length && found[0].hits < found[0].hitsMax * 0.9) {
                        if (found[0].hits < found[0].hitsMax * 0.8) {
                            creep.repair(found[0]);
                        } else {
                            creep.repair(found[0]);
                            creep.moveTo(0, 30);
                        }
                    } else {
                        creep.moveTo(49, 39);
                    }                    
                }
            }
        }
    },

    getBody: function(roomName) {
        return [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 3;
    },

    getCreateType: function(roomName) {
        return 'timing';
    },

    getCreateDelta: function(roomName) {
        return 500;
    },
};

module.exports = creepModule;