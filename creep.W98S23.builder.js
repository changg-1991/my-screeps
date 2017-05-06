var creepModule = {
    body: [WORK,WORK,CARRY,CARRY,MOVE,MOVE],
    count: 0,
    createType: 'counting',

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'BUILDING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'BUILDING';
        }

        if (creep.memory.status == 'PACKING') {
            var storage = Game.getObjectById(Memory.objectId.W98S23_storage);
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            var buildList = creep.room.find(FIND_CONSTRUCTION_SITES);

            if (buildList.length > 0) {
                if (creep.build(buildList[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildList[0], {visualizePathStyle: {stroke: '#05ff05'}});
                }
            }
        }
    }
};

module.exports = creepModule;