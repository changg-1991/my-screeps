var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
        }
        if (creep.memory.status != 'TRANSFERING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'TRANSFERING';
        }
        
        if (creep.memory.status == 'HARVESTING') {
            var source = Game.getObjectById(Memory.objectId.W94S29_sourceRight);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
            });
            if (target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                var buildList = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (buildList.length > 0) {
                    if (creep.build(buildList[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(buildList[0]);
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
        return [CARRY,WORK,MOVE];
    },

    getCount: function(roomName) {
        return 3;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;