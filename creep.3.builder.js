var creepModule = {
    body: [WORK,CARRY,MOVE],
    count: 2,
    createType: 'counting',

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'BUILDING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'BUILDING';
        }

        if (creep.memory.status == 'PACKING') {
            var pos = new RoomPosition(4, 38, 'W98S23');
            var target = pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if (target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
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