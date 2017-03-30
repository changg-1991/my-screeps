var roleEnergyDigger = require('role.energyDigger');
var roleCarrierToController = require('role.carrier.toController');
var roleCarrierToExtension = require('role.carrier.toExtension');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleEva = require('role.eva');
var roleTower = require('role.tower');
var roleArtillery = require('role.artillery');
var roleClaimer = require('role.claimer');

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
    Memory.containers.down = Game.getObjectById('58db616f2229d345295302ec');
}

module.exports.loop = function () {
    // 清理死去的creep占用的内存
    for (var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            if (Memory.creeps[name].role == 'energyDigger') {
                Memory.sourceList[Memory.creeps[name].sourceTarget] = 0;
            }

            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var energyDiggers = _.filter(Game.creeps, (creep) => creep.memory.role == 'energyDigger');

    var carrierToControllers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrierToController');

    var carrierToExtensions = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrierToExtension');

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    
    var evas = _.filter(Game.creeps, (creep) => creep.memory.role == 'eva');

    var artilleries = _.filter(Game.creeps, (creep) => creep.memory.role == 'artillery');
    
    console.log('energyDigger: ' + energyDiggers.length + ', carrierToController: ' + carrierToControllers.length + ', carrierToExtension: ' + carrierToExtensions.length + ', upgrader: ' + upgraders.length + ', builder: ' + builders.length + ', artillery: ' + artilleries.length);

    if (energyDiggers.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'energyDigger'});
    } else if (carrierToExtensions.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'carrierToExtension'});
    } else if (carrierToControllers.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'carrierToController'});
    } else if (upgraders.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
    } else if (Memory.buildList.length > 0 && builders.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
    } else if (artilleries.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'artillery'});
    } else {
        //
    }

    // 显示正在生产的角色
    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🔨' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
        console.log('Spawning new ' + spawningCreep.memory.role + ': ' + Game.spawns['Spawn1'].spawning.name);
    } else {
        if (Game.spawns['Spawn1'].room.energyAvailable < 600 && energyDiggers.length < 2 && carrierToExtensions.length < 1 && evas.length < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'eva'});
        }
    }

    // 分配工作
    // 获取需要repair的列表
    Memory.repairList = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax * 0.9 && structure.hitsMax - structure.hits > 800) || (structure.structureType == STRUCTURE_WALL && structure.hits < 30000);
        }
    });
    
    // 获取需要builder的列表
    Memory.buildList = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);

    // 让塔攻击
    var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    
    for (var index in towers) {
        var tower = towers[index];
        roleTower.run(tower);
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        switch (creep.memory.role) {
            case 'energyDigger':
                roleEnergyDigger.run(creep);
                break;
            case 'carrierToExtension':
                roleCarrierToExtension.run(creep);
                break;
            case 'carrierToController':
                roleCarrierToController.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'eva':
                roleEva.run(creep);
                break;
            case 'artillery':
                roleArtillery.run(creep);
                break;
            case 'claimer':
                roleClaimer.run(creep);
                break;
            default:
                //
        }
    }
}