var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'UNPACKING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'UNPACKING';
        }

        if (creep.memory.status == 'PACKING') {
            let targetRoom = 'W95S29';
            if (creep.room.name == targetRoom) {
                var pos = new RoomPosition(26, 20, 'W95S29');
                var target = pos.findClosestByRange(FIND_DROPPED_ENERGY);
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
            let targetRoom = 'W94S29';
            if (creep.room.name == targetRoom) {
                var target = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                    filter: (creep) => {
                        return creep.carry.energy <= (creep.carryCapacity - 20);
                    }
                });
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                /*if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }*/
            } else {
                var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

                if (constructionSite) {
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#05ff05'}});
                    }
                } else {
                    const found = creep.pos.lookFor(LOOK_STRUCTURES);
                    if (found.length && found[0].hits < found[0].hitsMax * 0.9 && found[0].hitsMax - found[0].hits > 800) {
                        creep.repair(found[0]);
                    }

                    const route = Game.map.findRoute(creep.room, targetRoom);
                    if (route.length > 0) {
                        const exit = creep.pos.findClosestByRange(route[0].exit);
                        creep.moveTo(exit);
                    }
                }
            }
        }
    },

    getBody: function(roomName) {
        return [WORK,CARRY,CARRY,CARRY,MOVE,MOVE];
    },

    getCount: function(roomName) {
        return 2;
    },

    getCreateType: function(roomName) {
        return 'timing';
    },

    getCreateDelta: function(roomName) {
        return 1500;
    },
};

module.exports = creepModule;