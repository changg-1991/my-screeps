var creepModule = {

    run: function(creep) {
        var buildList = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return structure.owner != 'changg_1991';
            }
        });

        if (buildList.lenth > 0) {
            creep.moveTo(buildList[0]);
        }
    }
};

module.exports = creepModule;