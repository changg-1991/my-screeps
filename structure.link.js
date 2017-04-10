var structureModule = {
    run: function(structure) {
        if (structure.room.name == 'W88S58') {
            if (structure.id != Memory.objectId._1LinkDown) {
                var link = Game.getObjectById(Memory.objectId._1LinkDown);
                structure.transferEnergy(link, 400);
            }
        } else if (structure.room.name == 'W88S59') {
            if (structure.id != Memory.objectId._2LinkRight) {
                var link = Game.getObjectById(Memory.objectId._2LinkRight);
                structure.transferEnergy(link, 400);
            }
        } else {

        }
    }
};

module.exports = structureModule;