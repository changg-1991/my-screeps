var structureModule = {
    run: function(structure) {
        if (structure.id != '58e3d21f298292fe252676f7') {
            var link = Game.getObjectById('58e3d21f298292fe252676f7');
            structure.transferEnergy(link, 400);
        }
    }
};

module.exports = structureModule;