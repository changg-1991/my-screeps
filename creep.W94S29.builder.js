var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'BUILDING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'BUILDING';
        }
        
        if (creep.memory.status == 'PACKING') {
            var storage = Game.getObjectById(Memory.objectId.W94S29_storage);
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        } else {
            if (Memory.W94S29_constructionSites.length > 0) {
                if (creep.build(Memory.W94S29_constructionSites[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Memory.W94S29_constructionSites[0]);
                }
            } else {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: function(object) {
                        return (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART) && object.hits < Memory.rooms.W94S29.wallHits + 10000;
                    }
                });

                if (target) {
                    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else {
                    Memory.rooms.W94S29.wallHits = Memory.rooms.W94S29.wallHits + 10000;
                }
            }
        }
    },

    getBody: function(roomName) {
        if (Memory.W94S29_constructionSites.length > 0) {
            return [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        } else {
            return [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        }
    },

    getCount: function(roomName) {
        if (Memory.W94S29_constructionSites.length > 0) {
            return 2;
        } else {
            return 1;
        }
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;