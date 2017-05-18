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

            if (room.controller.owner.username == 'changg_1991') {
                room.memory.role = 'claim';
            } else if (room.controller.reservation.username == 'changg_1991') {
                room.memory.role = 'reserve';
            } else {

            }
        }

        for (const name in Memory.rooms) {
            const room = Game.rooms[name];

            let hostiles = room.find(FIND_HOSTILE_CREEPS, {
                filter: function(object) {
                    return Memory.ally.indexOf(object.owner.username) == -1;
                }
            });

            // 检查hostiles的组成 是invade还是敌人、个数 等等
        }
    }
};

module.exports = runtime;