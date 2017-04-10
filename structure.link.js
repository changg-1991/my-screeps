var structureModule = {
    run: function(structure) {
        if (structure.room.name == 'W88S58') {
            if (structure.id != '58e3d21f298292fe252676f7') {
                var link = Game.getObjectById('58e3d21f298292fe252676f7');
                structure.transferEnergy(link, 400);
            }
        } else if (structure.room.name == 'W88S59') {
            if (structure.id != '58e9d9d3d233d37b682eb041') {
                var link = Game.getObjectById('58e9d9d3d233d37b682eb041');
                structure.transferEnergy(link, 400);
            }
        } else {

        }
    }
};

module.exports = structureModule;