var structureModule = {
    run: function(structure) {
        const targets = structure.room.find(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return Memory.ally.indexOf(object.owner) == -1;
            }
        });

        if (targets && targets.length > 0) {
            structure.setPublic(false);
        } else {
            structure.setPublic(true);
        }
    }
};

module.exports = structureModule;