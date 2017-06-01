var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'BUILDING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'BUILDING';
            delete creep.memory.packingTarget;
        }

        let targetRoom = 'W94S28';
        if (creep.room.name == targetRoom) {
            if (creep.memory.status == 'PACKING') {
                if (!creep.memory.packingTarget || creep.memory.packingTargetTimeOut < Game.time) {
                    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 1000;
                        }
                    });

                    if (!target) {
                        var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
                            filter: function(object) {
                                return object.amount > 300;
                            }
                        });
                    }

                    if (target) {
                        creep.memory.packingTarget = target.id;
                        creep.memory.packingTargetTimeOut = Game.time + 8;
                    }
                }

                var target = Game.getObjectById(creep.memory.packingTarget);
                if (target.store) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else if (target.resourceType) {
                    if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else {

                }
            } else {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                    }
                });
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else {
                    var constructionSites = Game.rooms['W94S28'].find(FIND_CONSTRUCTION_SITES);
                    if (constructionSites.length > 0) {
                        if (creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(constructionSites[0]);
                        }
                    } else {
                        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                        }
                    }
                }
            }
        } else {
            const route = Game.map.findRoute(creep.room, targetRoom);
            if (route.length > 0) {
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);
            }
        }
    },

    getBody: function(roomName) {
        return [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 3;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;