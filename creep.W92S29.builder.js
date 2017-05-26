var creepModule = {

    run: function(creep) {
        if (creep.memory.status != 'PACKING' && creep.carry.energy == 0) {
            creep.memory.status = 'PACKING';
        }
        if (creep.memory.status != 'BUILDING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'BUILDING';
        }

        let targetRoom = 'W92S29';
        if (creep.room.name == targetRoom) {
            if (creep.memory.status == 'PACKING') {
                var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
                    filter: function(object) {
                        return object.amount > 300;
                    }
                });
                if (target) {
                    if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
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
        return 6;
    },

    getCreateType: function(roomName) {
        return 'counting';
    },
};

module.exports = creepModule;