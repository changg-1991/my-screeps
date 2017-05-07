var creepModule = {
    body: [MOVE],
    count: 2,
    createType: 'timing',
    createDelta: 100,

    run: function(creep) {
        creep.moveTo(24,36);
    }
};

module.exports = creepModule;