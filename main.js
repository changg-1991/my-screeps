var config = require('config');
var creepController = require('creep.controller');
var structureController = require('structure.controller');

module.exports.loop = function () {

    // 显示正在生产的角色
    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🔨' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    // 获取需要repair的列表
    Memory.repairList = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800) || (structure.structureType == STRUCTURE_WALL && structure.hits < 30000);
        }
    });
    
    // 获取需要builder的列表
    Memory.buildList = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);

    structureController.run(config.structure);
    creepController.run(config.creep);
}