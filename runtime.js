var runtime = {
    run: function() {
        // 在console展示的概览
        let formatStr = "<table border='1'>"
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
        console.log(formatStr);

        // Room1: W88S58
        Memory._1RepairList = Game.rooms['W88S58'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800)
                    || ((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < 2000);
            }
        });

        Memory._1BuildList = Game.rooms['W88S58'].find(FIND_CONSTRUCTION_SITES);

        // Room2: W88S59
        Memory._2RepairList = Game.rooms['W88S59'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800;
            }
        });

        Memory._2BuildList = Game.rooms['W88S59'].find(FIND_CONSTRUCTION_SITES);

        //Room3: W86S59
        Memory._3RepairList = Game.rooms['W86S59'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800;
            }
        });
    }
};

module.exports = runtime;