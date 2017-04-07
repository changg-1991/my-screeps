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
        // TODO: eval()可以try catch一下，再把报错堆栈打印出来，这样一个creep出现异常不会影响后面的creep工作
        roleCount = new Object();
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            if (roleCount[creep.memory.role] == undefined) {
                roleCount[creep.memory.role] = 1;
            } else {
                roleCount[creep.memory.role] += 1;
            }

            eval('creepModules.' + creep.memory.role + '.run(creep);');
        }

        // Room 1
        // TODO: 之后有多个Spawn之后，可以在外层加一个循环解决问题
        if (roleCount._1DiggerLeft == null || roleCount._1DiggerLeft < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: '_1DiggerLeft'});
        } else if (roleCount._1CarrierLeft == null || roleCount._1CarrierLeft < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: '_1CarrierLeft'});
        } else if (roleCount._1DiggerRight == null || roleCount._1DiggerRight < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: '_1DiggerRight'});
        } else if (roleCount._1CarrierDown == null || roleCount._1CarrierDown < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: '_1CarrierDown'});
        } else if (roleCount._1Upgrader == null || roleCount._1Upgrader < 3) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: '_1Upgrader'});
        } else if (roleCount._1Artillery == null || roleCount._1Artillery < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: '_1Artillery'});
        } else if ((roleCount._1Builder == null || roleCount._1Builder < 1) && spwanOrder._1Builder) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: '_1Builder'});
        } else if (roleCount._1Exploiter == null || roleCount._1Exploiter < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: '_1Exploiter'});
        } else if ((roleCount._1Eva == null || roleCount._1Eva < 1) && spwanOrder._1Eva) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: '_1Eva'});
        } else if ((roleCount._1Security == null || roleCount._1Security < 1) && spwanOrder._1Security) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: '_1Security'});
        } else if (roleCount._1Stealler == null || roleCount._1Stealler < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: '_1Stealler'});
        } else {
            //
        }

        // Room 2
        if (roleCount._2Farmer == null || roleCount._2Farmer < 1) {
            var newName = Game.spawns['Spawn2'].createCreep([WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: '_2Farmer'});
        } else if (roleCount._2Builder == null || roleCount._2Builder < 1) {
            var newName = Game.spawns['Spawn2'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: '_2Builder'});
        } else if (roleCount._2Repairer == null || roleCount._2Repairer < 1) {
            var newName = Game.spawns['Spawn2'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: '_2Repairer'});
        } else if (roleCount._2Carrier == null || roleCount._2Carrier < 1) {
            var newName = Game.spawns['Spawn2'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: '_2Carrier'});
        } else if (roleCount._2Upgrader == null || roleCount._2Upgrader < 1) {
            var newName = Game.spawns['Spawn2'].createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: '_2Upgrader'});
        } else {
            //
        }
    }
};

module.exports = creepController;