const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EquityOptionSchema = new Schema({
    CONTRACT_D: {
        type: String,

    },
    PREVIOS_S: {
        type: Number,

    },
    OPEN_PRICE: {
        type: Number,

    },
    HIGH_PRICE: {
        type: Number,

    },
    LOW_PRICE: {
        type: Number,

    },
    CLOSE_PRIC: {
        type: Number,

    },
    SETTLEMENT: {
        type: Number,

    },
    NET_CHANGE: {
        type: Number,

    },
    OI_ON_CON: {
        type: Number,

    },
    TRADED_QUA: {
        type: Number,

    },
    TRD_NO_QUA: {
        type: Number,

    },
    UNDRLNG_ST: {
        type: Number,

    },
    NOTIONAL_V: {
        type: Number,

    },
    PREMIUM_TR: {
        type: Number,

    },
    TIMESTAMP: {
        type: String,

    },
    INSTRUMENT: {
        type: String,

    },
    EXPIRY_DT: {
        type: String,

    },
    SYMBOL: {
        type: String,

    },
    OPTION_TYP: {
        type: String,

    },
    STRIKE_PR: {
        type: Number,

    },
    LOT_SIZE: {
        type: Number,

    },
    NEAR: {
        type: String,

    },
    FAR: {
        type: String,

    },
    FARTHEST: {
        type: String,

    },

    DAYS_TO_EXP: {
        type: Number,

    },
    DIFFERENCE: {
        type: Number,

    },
    STRIKE_RANK: {
        type: Number,

    },
    NEAR_CHECK: {
        type: Boolean,

    },
    FAR_CHECK: {
        type: Boolean,

    },
    FARTHEST_CHECK: {
        type: Boolean,

    }

});


module.exports = EquityOption = mongoose.model('equityoptions', EquityOptionSchema);
