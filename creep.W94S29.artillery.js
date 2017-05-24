var creepModule = {

    run: function(creep) {
        var towers = creep.room.find(FIND_STRUCTURES, {
            filter: function (structure) {
                return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity;
            }
        });

        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UNPACKING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UNPACKING';
        }
        
        if (creep.memory.status == 'PACKING') {
            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
                filter: function(object) {
                    return object.amount > 1000;
                }
            });
            if (target) {
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                if (towers.length > 0) {
                    var storage = Game.getObjectById(Memory.objectId.W94S29_storage);
                    if (creep.withdraw(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        } else {
            if (towers.length > 0) {
                var index = 0;
                for (i = 0; i < towers.length - 1; i++) {
                    if (towers[i + 1].energy < towers[i]) {
                        index = i + 1;
                    }
                }
                if (creep.transfer(towers[index], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[index]);
                }
            } else {
                var storage = Game.getObjectById(Memory.objectId.W94S29_storage);
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
        }
    },

    getBody: function(roomName) {
        return [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 1;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;