var structureModule = {
    run: function(structure) {
        if (structure.room.name == 'W98S23') {
            if (structure.id != Memory.objectId.W98S23_linkCenter) {
                var link = Game.getObjectById(Memory.objectId.W98S23_linkCenter);
                structure.transferEnergy(link, 400);
            }
        } else {

        }
    }
};

module.exports = structureModule;