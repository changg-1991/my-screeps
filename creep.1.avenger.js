var roleAvenger = {
    run: function(creep) {
        if (creep.room.name == 'W88S58') {
            creep.moveTo(17, 49);
        } else if (creep.room.name == 'W88S59') {
            creep.moveTo(0, 11);
        } else if (creep.room.name == 'W89S59') {
            creep.moveTo(32, 0);
        } else if (creep.room.name == 'W89S58') {
            creep.moveTo(0, 25);
        } else if (creep.room.name == 'W90S58') {
            creep.moveTo(31, 0);
        } else if (creep.room.name == 'W90S57') {
            creep.moveTo(28, 0);
        } else if (creep.room.name == 'W90S56') {
            creep.moveTo(49, 41);
        } else if (creep.room.name == 'W89S56') {
            creep.moveTo(4, 40);
        } else {

        }
    }
};

module.exports = roleAvenger;