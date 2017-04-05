var config = require('config');
var creepController = require('creep.controller');

var roleTower = require('role.tower');

var role2Tower = require('role.2.tower');

if (typeof(Memory.repairList) == "undefined") {
    Memory.repairList = new Array();
}

if (typeof(Memory.buildList) == "undefined") {
    Memory.buildList = new Array();
}

if (typeof(Memory.sourceList) == "undefined") {
    Memory.sourceList = new Object();

    var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
    for (var index in sources) {
        Memory.sourceList[sources[index].id] = 0;
    }
}

if (typeof(Memory.containers) == "undefined") {
    Memory.containers = new Object();
    Memory.containers.left = Game.getObjectById('58da2768a3467e793134676f');
    Memory.containers.right = Game.getObjectById('58da18c857c1f5f93164d3ee');
    Memory.containers.down = Game.getObjectById('58dcf858d6b3d1910534e0a8');
}

module.exports.loop = function () {

    creepController.run(config.creep);

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

    // 让塔工作
    var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    for (var index in towers) {
        var tower = towers[index];
        roleTower.run(tower);
    }

    var _2Tower = Game.getObjectById('58e099210fae7f090807ddee');
    role2Tower.run(_2Tower);
}