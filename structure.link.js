var structureModule = {

    run: function(structure) {
        if (structure.room.name == 'W92S29') {
            if (structure.id != Memory.objectId.W92S29_linkCenter) {
                var link = Game.getObjectById(Memory.objectId.W92S29_linkCenter);
                structure.transferEnergy(link, 400);
            }
        } else {

        }
    }
};

module.exports = structureModule;