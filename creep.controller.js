var creepController = {
    /**
     * creepModules: 在配置文件中加载进来的creep角色的运行模块
     * spwanOrder: main中通过计算得出的针对某些特定角色的生产命令
     */
    run: function(creepModules, spwanOrder = new Object()) {
        // 清理死去的creep占用的内存
        for (var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing Non-Existing Creep Memory:', name);
            }
        }

        // 让所有creep操练起来，并计数每种role的数量
        roleCount = new Object();
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];

            if (roleCount[creep.memory.role] == undefined) {
                roleCount[creep.memory.role] = 1;
            } else {
                roleCount[creep.memory.role] += 1;
            }

            if (creep.memory.role) {
                try {
                    eval('creepModules.' + creep.memory.role + '.run(creep);');
                } catch (e) {
                    console.log(e.name + ': ' + e.message);
                    console.log(e.stack);
                }
                
            }
        }

        for (const name in Game.spawns) {
            var spawn = Game.spawns[name];
            // Room 1
            if (Game.spawns[i].room.name == 'W88S58') {
                if (roleCount._1DiggerLeft == null || roleCount._1DiggerLeft < 1) {
                    var newName = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: '_1DiggerLeft'});
                } else if (roleCount._1CarrierLeft == null || roleCount._1CarrierLeft < 1) {
                    var newName = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: '_1CarrierLeft'});
                } else if (roleCount._1DiggerRight == null || roleCount._1DiggerRight < 1) {
                    var newName = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: '_1DiggerRight'});
                } else if (roleCount._1CarrierDown == null || roleCount._1CarrierDown < 1) {
                    var newName = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: '_1CarrierDown'});
                } else if (roleCount._1Upgrader == null || roleCount._1Upgrader < 1) {
                    var newName = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: '_1Upgrader'});
                } else if (roleCount._1Artillery == null || roleCount._1Artillery < 1) {
                    var newName = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: '_1Artillery'});
                } else if ((roleCount._1Builder == null || roleCount._1Builder < 1) && spwanOrder._1Builder) {
                    var newName = spawn.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: '_1Builder'});
                } else if ((roleCount._1Eva == null || roleCount._1Eva < 1) && spwanOrder._1Eva) {
                    var newName = spawn.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: '_1Eva'});
                } else if ((roleCount._1Security == null || roleCount._1Security < 1) && spwanOrder._1Security) {
                    var newName = spawn.createCreep([ATTACK,ATTACK,MOVE,MOVE], undefined, {role: '_1Security'});
                } else {
                    if ((roleCount._1Reserver == null || roleCount._1Reserver < 1) && (Memory._1ReserverBirthTime == null || Memory._1ReserverBirthTime < Game.time - 800)) {
                        var newName = spawn.createCreep([CLAIM,CLAIM,MOVE,MOVE], undefined, {role: '_1Reserver'});
                        if (isNaN(newName)) {
                            Memory._1ReserverBirthTime = Game.time;
                        }
                    } else if((roleCount._1DiggerUp == null || roleCount._1DiggerUp < 1) && (Memory._1DiggerUpBirthTime == null || Memory._1DiggerUpBirthTime < Game.time - 1500)) {
                        var newName = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: '_1DiggerUp'});
                        if (isNaN(newName)) {
                            Memory._1DiggerUpBirthTime = Game.time;
                        }
                    } else if((roleCount._1CarrierUp == null || roleCount._1CarrierUp < 1) && (Memory._1CarrierUpBirthTime == null || Memory._1CarrierUpBirthTime < Game.time - 1500)) {
                        var newName = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: '_1CarrierUp'});
                        if (isNaN(newName)) {
                            Memory._1CarrierUpBirthTime = Game.time;
                        }
                    } else if((roleCount._1Repairer == null || roleCount._1Repairer < 1) && (Memory._1RepairerBirthTime == null || Memory._1RepairerBirthTime < Game.time - 1500)) {
                        var newName = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: '_1Repairer'});
                        if (isNaN(newName)) {
                            Memory._1RepairerBirthTime = Game.time;
                        }
                    } else {
                        //
                    }
                }
            // Room 2
            } else if (Game.spawns[i].room.name == 'W88S59') {
                if (roleCount._2Digger == null || roleCount._2Digger < 1) {
                    var newName = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: '_2Digger'});
                } else if (roleCount._2Farmer == null || roleCount._2Farmer < 1) {
                    var newName = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: '_2Farmer'});
                } else if ((roleCount._2Builder == null || roleCount._2Builder < 1) && spwanOrder._2Builder) {
                    var newName = spawn.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: '_2Builder'});
                } else if (roleCount._2Carrier == null || roleCount._2Carrier < 1) {
                    var newName = spawn.createCreep([CARRY,CARRY,MOVE], undefined, {role: '_2Carrier'});
                } else if (roleCount._2Upgrader == null || roleCount._2Upgrader < 1) {
                    var newName = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: '_2Upgrader'});
                } else {
                    //
                }
            // Room 3
            } else if (Game.spawns[i].room.name == 'W86S59') {
                if (roleCount._3DiggerRight == null || roleCount._3DiggerRight < 1) {
                    var newName =spawn.createCreep([WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: '_3DiggerRight'});
                } else if (roleCount._3CarrierRight == null || roleCount._3CarrierRight < 1) {
                    var newName =spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: '_3CarrierRight'});
                } else if (roleCount._3Upgrader == null || roleCount._3Upgrader < 3) {
                    var newName =spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: '_3Upgrader'});
                } else if (roleCount._3DiggerLeft == null || roleCount._3DiggerLeft < 1) {
                    var newName =spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: '_3DiggerLeft'});
                } else if (roleCount._3CarrierCenter == null || roleCount._3CarrierCenter < 1) {
                    var newName =spawn.createCreep([CARRY,CARRY,MOVE], undefined, {role: '_3CarrierCenter'});
                } else {
                    //
                }
            } else {
                //
            }
        }
    }
};

module.exports = creepController;