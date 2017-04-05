var role1DiggerRight = {

    run: function(creep) {
        // 确定当前digger的状态
        if (creep.memory.status != 'HARVESTING' && creep.carry.energy == 0) {
            creep.memory.status = 'HARVESTING';
        }
        if (creep.memory.status != 'TRANSFERING' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = 'TRANSFERING';
        }

        if (creep.memory.status == 'HARVESTING') {
            var source = Game.getObjectById('5873bb8a11e3e4361b4d602b');
            var result = creep.harvest(source);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            var link = Game.getObjectById('58e4a05c5191d96b2e9ad865');

            if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, {visualizePathStyle: {stroke: '#05ff05'}});
            }

            if (link.energy > 500) {
                var linkDown = Game.getObjectById('58e3d21f298292fe252676f7');
                link.transferEnergy(linkDown);
            }
        }
    }
};

module.exports = role1DiggerRight;