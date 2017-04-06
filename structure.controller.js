var structureController = {
    run: function(structureModules) {
        for(var i in Game.structures) {
            var structure = Game.structures[i];

            switch (structure.structureType) {
                case STRUCTURE_LINK:
                    structureModules.link.run(structure);
                    break;
                case STRUCTURE_TOWER:
                    structureModules.tower.run(structure);
                    break;
                default:
                    //
            }
        }
    }
};

module.exports = structureController;