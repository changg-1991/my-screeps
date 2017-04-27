var creepModule = {
    body: [ATTACK,MOVE],
    count: 0,
    createType: 'counting',

    run: function(creep) {
        var targets = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return object.owner == 'NixNutz';
            }
        });

        if (targets && targets.length > 0) {
            attack(creep);
        } else {
            if (creep.room.name == 'W88S58') {
                creep.moveTo(12, 49);
            } else if (creep.room.name == 'W88S59') {
                creep.moveTo(0, 13);
            } else if (creep.room.name == 'W89S59') {
                creep.moveTo(30, 0);
            } else if (creep.room.name == 'W89S58') {
                creep.moveTo(0, 24);
            } else if (creep.room.name == 'W90S58') {
                creep.moveTo(30, 0);
            } else if (creep.room.name == 'W90S57') {
                creep.moveTo(26, 0);
            } else if (creep.room.name == 'W90S56') {
                creep.moveTo(32, 0);
            } else if (creep.room.name == 'W90S55') {
                //
            } else {
                //
            }
        }
    },

    attack: function(creep) {
        var targets = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return object.owner == 'NixNutz';
            }
        });

        var isSafe = true;
        for (const badGuy in targets) {
            if (badGuy.id == '58fe23030ef0ff1828d8f14a' || badGuy.id == '58fe225bcec01d3d3a658e0e' || badGuy.id == '58fe2543bd133e842cfdf8e7') {
                if (creep.pos.inRangeTo(badGuy, 2)) {
                    isSafe = false;
                }
            } else {
                continue;
            }   
        }

        if (!isSafe) {
            if (creep.room.name == 'W90S55') {
                creep.moveTo(32, 49);
            } else if (creep.room.name == 'W90S56') {
                creep.moveTo(26, 49);
            } else if (creep.room.name == 'W90S57') {
                creep.moveTo(30, 49);
            } else {

            }
        } else {
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function(object) {
                    return Memory.ally.indexOf(object.owner) == -1;
                }
            });

            if (creep.pos.inRangeTo(closestHostile, 3)) {
                creep.rangedAttack(closestHostile);
            }
            if (creep.pos.inRangeTo(closestHostile, 1)) {
                creep.attack(closestHostile);
            }
            creep.moveTo(closestHostile);
        }
    }
};

module.exports = creepModule;