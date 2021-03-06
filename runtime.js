var runtime = {
    run: function() {
        // 在console展示的概览
        /*let formatStr = "<table border='1'>"
        for (const name in Game.rooms) {
            const room = Game.rooms[name];
            if (room.controller == undefined) {
                continue;
            }
            let isUnderAttack = "#C0FF3E";
            if (room.find(FIND_HOSTILE_CREEPS).length){
                isUnderAttack = "#CD5B45";
            }
            let rcl = "RCL: " + room.controller.level;
            let RCLProgress = "progress: " + room.controller.progress + ' / ' + room.controller.progressTotal;
            let energyProgress = "energy: " + room.energyAvailable + ' / ' + room.energyCapacityAvailable;
            addFormatStr = "<tr height='30'><td rowspan='3' style='padding:15px;color:"+ isUnderAttack + "'>" + name + "</td><td style='color:#AB82FF;padding:15px'>" + rcl + "</td></tr><tr height='30'><td style='color:#B0E2FF;padding:15px'>" + RCLProgress + "</td></tr><tr height='30'><td style='color:#FFEC8B;padding:15px'>" + energyProgress + "</td></tr>";
            formatStr = formatStr + addFormatStr;
        }
        formatStr = formatStr + "</table>"
        console.log(formatStr);*/

        for (const name in Game.rooms) {
            const room = Game.rooms[name];
            
            if (room.controller == undefined) {
                continue;
            }

            if (room.controller.owner && room.controller.owner.username == 'changg_1991') {
                room.memory.role = 'claim';
            } else if (room.controller.reservation && room.controller.reservation.username == 'changg_1991') {
                room.memory.role = 'reserve';
            } else {

            }
        }

        for (const name in Memory.rooms) {
            if (Game.rooms[name]) {
                const room = Game.rooms[name];
                let hostiles = room.find(FIND_HOSTILE_CREEPS, {
                    filter: function(object) {
                        return Memory.ally.indexOf(object.owner.username) == -1;
                    }
                });

                if (hostiles && hostiles.length > 0) {
                    Game.rooms[name].status = 'INVADED';
                } else {
                    Game.rooms[name].status = 'GOOD';
                }
            }

            // 检查hostiles的组成 是invade还是敌人、个数 等等
        }

        // W94S29
        /*Memory.W94S29_repairList = Game.rooms['W94S29'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800)
                    || ((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits > Memory.rooms.W94S29.wallHits - 10000 && structure.hits < Memory.rooms.W94S29.wallHits);
            }
        });

        var target = Game.rooms['W94S29'].find(FIND_STRUCTURES, {
            filter: function(object) {
                return (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART) && object.hits < Memory.rooms.W92S29.wallHits + 10000;
            }
        });

        if (!target || target.length == 0) {
            Memory.rooms.W94S29.wallHits = Memory.rooms.W94S29.wallHits + 10000;
        }

        Memory.W94S29_constructionSites = Game.rooms['W94S29'].find(FIND_CONSTRUCTION_SITES);

        // W92S29
        Memory.W92S29_repairList = Game.rooms['W92S29'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800)
                    || ((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits > Memory.rooms.W92S29.wallHits - 10000 && structure.hits < Memory.rooms.W92S29.wallHits);
            }
        });

        var target = Game.rooms['W92S29'].find(FIND_STRUCTURES, {
            filter: function(object) {
                return (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART) && object.hits < Memory.rooms.W92S29.wallHits + 10000;
            }
        });

        if (!target || target.length == 0) {
            Memory.rooms.W92S29.wallHits = Memory.rooms.W92S29.wallHits + 10000;
        }

        // W94S28
        Memory.W94S28_repairList = Game.rooms['W94S28'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800)
                    || ((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits > Memory.rooms.W94S28.wallHits - 10000 && structure.hits < Memory.rooms.W94S28.wallHits);
            }
        });

        // W92S28
        Memory.W92S28_repairList = Game.rooms['W92S28'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800)
                    || ((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits > Memory.rooms.W92S28.wallHits - 10000 && structure.hits < Memory.rooms.W92S28.wallHits);
            }
        });*/
    }
};

module.exports = runtime;