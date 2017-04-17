var runtime = {
    run: function() {
        /*var formatStr = "<table border='1'>"
        for(var name in Game.rooms){
            // console.log(Game.rooms[name]);
            var isUnderAttack = "#C0FF3E";
            if(Game.rooms[name].find(FIND_HOSTILE_CREEPS).length){
                isUnderAttack = "#CD5B45";
            }
            var rcl = "RCL: " + Game.rooms[name].controller.level;
            var RCLProgress = "progress: " + Game.rooms[name].controller.progress + ' / ' + Game.rooms[name].controller.progressTotal;
            var energyProgress = "energy: " + Game.rooms[name].energyAvailable + ' / ' + Game.rooms[name].energyCapacityAvailable;
            addFormatStr = "<tr height='30'><td rowspan='3' style='padding:15px;color:"+ isUnderAttack + "'>" + name + "</td><td style='color:#AB82FF;padding:15px'>" + rcl + "</td></tr><tr height='30'><td style='color:#B0E2FF;padding:15px'>" + RCLProgress + "</td></tr><tr height='30'><td style='color:#FFEC8B;padding:15px'>" + energyProgress + "</td></tr>";
            formatStr = formatStr + addFormatStr;
        }
        formatStr = formatStr + "</table>"
        console.log(formatStr);*/

        // 显示正在生产的角色
        if (Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text('🔨' + spawningCreep.memory.role, Game.spawns['Spawn1'].pos.x + 1, Game.spawns['Spawn1'].pos.y, {align: 'left', opacity: 0.8});
        }

        if (Game.spawns['Spawn2'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn2'].spawning.name];
            Game.spawns['Spawn2'].room.visual.text('🔨' + spawningCreep.memory.role, Game.spawns['Spawn2'].pos.x + 1, Game.spawns['Spawn2'].pos.y, {align: 'left', opacity: 0.8});
        }

        // Room1: W88S58
        Memory._1repairList = Game.rooms['W88S58'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800;
            }
        });

        Memory._1buildList = Game.rooms['W88S58'].find(FIND_CONSTRUCTION_SITES);

        // Room2: W88S59
        Memory._2repairList = Game.rooms['W88S59'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800;
            }
        });

        Memory._2buildList = Game.rooms['W88S59'].find(FIND_CONSTRUCTION_SITES);
    }
};

module.exports = runtime;