var creepController = {
    /**
     * creepModules: 在配置文件中加载进来的creep角色的运行模块
     */
    run: function(creepModules) {
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
            let creep = Game.creeps[name];

            if (roleCount[creep.memory.role] == undefined) {
                roleCount[creep.memory.role] = 1;
            } else {
                roleCount[creep.memory.role] += 1;
            }

            if (creep.memory.role) {
                try {
                    creepModules[creep.memory.role].run(creep);
                } catch (e) {
                    console.log(e.stack);
                }
                
            }
        }

        // 判断是否生产新的creep
        for (const name in Game.spawns) {
            let spawn = Game.spawns[name];

            if (spawn.spawning) {
                spawn.room.visual.text('🔨' + Game.creeps[spawn.spawning.name].memory.role, spawn.pos.x + 1, spawn.pos.y, {align: 'left', opacity: 0.8});
                continue;
            }

            var roleList = new Array();
            if (spawn.room.name == 'W88S58') {
                roleList = creepModules._1RoleList;
            } else if (spawn.room.name == 'W88S59') {
                roleList = creepModules._2RoleList;
            } else if (spawn.room.name == 'W56S59') {
                roleList = creepModules._3RoleList;
            }

            for (const i in roleList) {
                let role = roleList[i]
                if ((creepModules[role].count > 0 && (!roleCount[role] || roleCount[role] < creepModules[role].count))
                    && (creepModules[role].createType == 'timing' && (!Memory.birthTime[role] || Memory.birthTime[role] < Game.time - creepModules[role].createDelta))) {

                    let result = spawn.createCreep(creepModules[role].body, undefined, {role: role});
                    if (isNaN(result)) {
                        if (roleCount[role] == null) {
                            roleCount[role] = 1;
                        } else {
                            roleCount[role] += 1;
                        }
                        
                        if (creepModules[role].createType == 'timing') {
                            Memory.birthTime[role] = Game.time;
                        }
                    }
                    break;
                }
            }
        }
    }
};

module.exports = creepController;