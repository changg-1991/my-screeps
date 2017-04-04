var roleEnergyDigger = require('role.energyDigger');
var roleCarrierToController = require('role.carrier.toController');
var roleCarrierToExtension = require('role.carrier.toExtension');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleEva = require('role.eva');
var roleTower = require('role.tower');
var roleArtillery = require('role.artillery');
var roleClaimer = require('role.claimer');
var roleExploiter = require('role.exploiter');
var roleSecurity = require('role.security');
var role2Farmer = require('role.2.farmer');
var role2Builder = require('role.2.builder');
var role2Repairer = require('role.2.repairer');
var roleAvenger = require('role.avenger');
var config = require('config');
var role2Carrier = require('role.2.carrier');
var role2Upgrader = require('role.2.upgrader');
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

    var exploiters = _.filter(Game.creeps, (creep) => creep.memory.role == 'exploiter');

    var securities = _.filter(Game.creeps, (creep) => creep.memory.role == 'security');

    var _2Farmers = _.filter(Game.creeps, (creep) => creep.memory.role == '2Farmer');

    var _2Builders = _.filter(Game.creeps, (creep) => creep.memory.role == '2Builder');

    var _2Repairers = _.filter(Game.creeps, (creep) => creep.memory.role == '2Repairer');

    var _2Carriers = _.filter(Game.creeps, (creep) => creep.memory.role == '2Carrier');

    var _2Upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == '2Upgrader');
    
    console.log('energyDigger: ' + energyDiggers.length + ', carrierToController: ' + carrierToControllers.length + ', carrierToExtension: ' + carrierToExtensions.length + ', upgrader: ' + upgraders.length + ', builder: ' + builders.length + ', artillery: ' + artilleries.length);

    if (energyDiggers.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'energyDigger'});
    } else if (carrierToExtensions.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'carrierToExtension'});
    } else if (carrierToControllers.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'carrierToController'});
    } else if (upgraders.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
    } else if (Memory.buildList.length > 0 && builders.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
    } else if (artilleries.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'artillery'});
    } else if (exploiters.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'exploiter'});
    } else if (securities.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([ATTACK,MOVE,MOVE], undefined, {role: 'security'});
    } else {
        //
    }

    if (_2Farmers.length < 1) {
        var newName = Game.spawns['Spawn2'].createCreep([WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: '2Farmer'});
    } else if (_2Builders.length < 1) {
        var newName = Game.spawns['Spawn2'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: '2Builder'});
    } else if (_2Repairers.length < 1) {
        var newName = Game.spawns['Spawn2'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: '2Repairer'});
    } else if (_2Carriers.length < 1) {
        var newName = Game.spawns['Spawn2'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: '2Carrier'});
    } else if (_2Upgraders.length < 2) {
        var newName = Game.spawns['Spawn2'].createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: '2Upgrader'});
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
            case 'exploiter':
                roleExploiter.run(creep);
                break;
            case 'security':
                roleSecurity.run(creep);
                break;
            case '2Farmer':
                role2Farmer.run(creep);
                break;
            case '2Builder':
                role2Builder.run(creep);
                break;
            case '2Repairer':
                role2Repairer.run(creep);
                break;
            case 'avenger':
                roleAvenger.run(creep);
                break;
            case '2Carrier':
                role2Carrier.run(creep);
                break;
            case '2Upgrader':
                role2Upgrader.run(creep);
                break;
            default:
                //
        }
    }
}