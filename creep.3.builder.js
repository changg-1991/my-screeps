var creepModule = {
    body: [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
    count: 0,
    createType: 'counting',

    run: function(creep) {
        if (creep.room.name == 'W88S58') {
            creep.moveTo(25, 49);
        } else if (creep.room.name == 'W88S59') {
            creep.moveTo(49, 42);
        } else if (creep.room.name == 'W87S59') {
            creep.moveTo(35, 49);
        } else if (creep.room.name == 'W87S60') {
            creep.moveTo(49, 8);
        } else if (creep.room.name == 'W86S60') {
            creep.moveTo(17, 0);
        } else if (creep.room.name == 'W86S59') {
            if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
                creep.memory.status = 'PACKING';
            }
            if (creep.memory.status != 'BUILDING' && creep.carry.energy == creep.carryCapacity) {
                creep.memory.status = 'BUILDING';
            }

            if (creep.memory.status == 'PACKING') {
                var container = Game.getObjectById(Memory.objectId._3Container);

                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var buildList = creep.room.find(FIND_CONSTRUCTION_SITES);

                if (buildList.length > 0) {
                    if (creep.build(buildList[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(buildList[0], {visualizePathStyle: {stroke: '#05ff05'}});
                    }
                }
            }
        } else {
            //
        }
    }
};

module.exports = creepModule;