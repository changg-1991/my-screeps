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

        Memory.W98S23_repairList = Game.rooms['W98S23'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800)
                    || (structure.structureType == STRUCTURE_WALL && structure.hits < 1000);
            }
        });

        Memory.W99S21_repairList = Game.rooms['W99S21'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800)
                    || (structure.structureType == STRUCTURE_WALL && structure.hits < 1000);
            }
        });
    }
};

module.exports = runtime;