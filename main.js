var roleFarmer = require('role.farmer');
var roleWorker = require('role.worker');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleArtillery = require('role.artillery');
var roleSoldier = require('role.soldier');

if (typeof(Memory.repairList) == "undefined") {
    Memory.repairList = new Object();
}

if (typeof(Memory.buildList) == "undefined") {
    Memory.buildList = new Object();
}

if (typeof(Memory.repairerCount) == "undefined") {
    Memory.repairerCount = 0;
}

if (typeof(Memory.builderCount) == "undefined") {
    Memory.builderCount = 0;
}

if (typeof(Memory.artilleryCount) == "undefined") {
    Memory.artilleryCount = 0;
}

module.exports.loop = function () {
    // 清理死去的creep占用的内存
    for (var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            if (Memory.creeps[name].role == 'repairer') {
                Memory.repairerCount -= 1;
                Memory.repairList[Memory.creeps[name].repairing] = 0;
            }
            if (Memory.creeps[name].role == 'builder') {
                Memory.builderCount -= 1;
                Memory.buildList[Memory.creeps[name].building] = 0;
            }
            if (Memory.creeps[name].role == 'artillery') {
                Memory.artilleryCount -= 1;
            }
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var farmers = _.filter(Game.creeps, (creep) => creep.memory.role == 'farmer');
    
    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    var artilleries = _.filter(Game.creeps, (creep) => creep.memory.role == 'artillery');
    
    console.log('Farmers: ' + farmers.length + ', Workers: ' + workers.length + ', Builders: ' + builders.length + ', Repairers: ' + repairers.length + ', Artilleries: ' + artilleries.length);

    // 生产creep
    // 优先判断farmer是否充足，不足则补足
    if (farmers.length + artilleries.length < 4) {
        if (farmers.length < 2 && Game.spawns['Spawn1'].canCreateCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE] != 0)) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'farmer'});
        } else {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'farmer'});
        }
        console.log('Spawning new farmer: ' + newName);
    // farmer充足的前提下，生产worker
    } else {
        if (repairers.length + builders.length + workers.length < 10) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'worker'});
            console.log('Spawning new worker: ' + newName);
        }
    }
    
    // 显示正在生产的角色
    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    // 分配工作
    // 计算需要repairer的数量
    var structuresNeedRepair = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES);
    for (var index in structuresNeedRepair) {
        var structure = structuresNeedRepair[index];
        if (((structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax * 0.8) || (structure.structureType == STRUCTURE_WALL && structure.hits < 30000)) && Memory.repairList.hasOwnProperty(structure.id) == false) {
            Memory.repairList[structure.id] = 0;
        }
    }
    var availableRepairCount = 0;
    for (var structureId in Memory.repairList) {
        if (Memory.repairList[structureId] == 0) {
            availableRepairCount += 1;
        }
    }
    
    // 计算需要builder的数量
    var constructureSitesNeedBuild = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
    for (var index in constructureSitesNeedBuild) {
        var constructureSite = constructureSitesNeedBuild[index];
        if (Memory.buildList.hasOwnProperty(constructureSite.id) == false) {
            Memory.buildList[constructureSite.id] = 0;
        }
    }
    var availableBuildCount = 0;
    for (var constructureSiteId in Memory.buildList) {
        if (Memory.buildList[constructureSiteId] == 0) {
            availableBuildCount += 1;
        }
    }
    
    // 计算需要充能的tower的数量
    var availableTowerCount = 0;
    var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    for (var index in towers) {
        var tower = towers[index];
        if (tower.energy < tower.energyCapacity) {
            availableTowerCount += 1;
        }
    }
    
    // 让塔攻击
    for (var index in towers) {
        var tower = towers[index];
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        //renew creep
        if (creep.ticksToLive < CREEP_LIFE_TIME / 3) {
            //
        }
        
        if (creep.memory.role == 'artillery') {
            roleArtillery.run(creep);
        } else if (creep.memory.role == 'farmer') {
            if (Memory.artilleryCount < 1 && availableTowerCount > 0) {
                creep.memory.role = 'artillery';
                Memory.artilleryCount += 1;
                availableTowerCount -= 1;
                roleArtillery.run(creep);
            } else {
                roleFarmer.run(creep);
            }
        } else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if (creep.memory.role == 'worker') {
            if (Memory.repairerCount < 3 && availableRepairCount > 0) {
                creep.memory.role = 'repairer';
                Memory.repairerCount += 1;
                availableRepairCount -= 1;
                roleRepairer.run(creep);
            } else if (Memory.builderCount < 3 && availableBuildCount > 0) {
                creep.memory.role = 'builder';
                Memory.builderCount += 1;
                availableBuildCount -= 1;
                roleBuilder.run(creep);
            } else {
                roleWorker.run(creep);
            }
        } else if (creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        } else {
            //
        }
    }
}

/**
 * TODO:
 * 
 * DONE:
 * Farmer现在transfer energy的方法不对，得改
 */