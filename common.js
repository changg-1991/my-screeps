var common = {

    run: function(creep, target) {
        if (creep.fatigue > 0) {
            return ERR_TIRED;
        }

        if (typeof(target) == "undefined") {
            return ERR_INVALID_TARGET;
        }
    }
};

module.exports = common;