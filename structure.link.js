var structureModule = {
    run: function(structure) {
        if (structure.room.name == 'W98S23') {
            if (structure.id != Memory.objectId.W98S23_linkCenter) {
                var link = Game.getObjectById(Memory.objectId.W98S23_linkCenter);
                structure.transferEnergy(link, 400);
            }
        } else if (structure.room.name == 'W99S21') {
            if (structure.id != Memory.objectId.W99S21_linkCenter) {
                var link = Game.getObjectById(Memory.objectId.W99S21_linkCenter);
                structure.transferEnergy(link, 400);
            }
        } else {

        }
    }
};

module.exports = structureModule;