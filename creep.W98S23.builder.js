var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'BUILDING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'BUILDING';
            delete creep.memory.packingTarget;
        }

        if (creep.memory.status == 'PACKING') {
            const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(target) {
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function (structure) {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
            });
            if (target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                var constructionSites = Game.rooms['W92S29'].find(FIND_CONSTRUCTION_SITES);
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
    },

    getBody: function(roomName) {
        return [WORK,CARRY,MOVE];
    },

    getCount: function(roomName) {
        return 9;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;