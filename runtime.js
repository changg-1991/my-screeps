var runtime = {
    run: function() {
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