var structureController = {
    run: function(structureModules) {
        for(var i in Game.structures) {
            var structure = Game.structures[i];

            try {
                switch (structure.structureType) {
                    case STRUCTURE_LINK:
                        structureModules.link.run(structure);
                        break;
                    case STRUCTURE_TOWER:
                        structureModules.tower.run(structure);
                        break;
                    case STRUCTURE_RAMPART:
                        structureModules.rampart.run(structure);
                        break;
                    default:
                        //
                }
            } catch (e) {
                console.log(e.stack);
            }
        }
    }
};

module.exports = structureController;