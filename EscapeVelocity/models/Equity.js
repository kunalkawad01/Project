const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EquitySchema = new Schema({
    "Unnamed:0": {
        type: Number
    },
    TIMESTAMP: {
        type: String,
        required: true
    },
    OPEN: {
        type: Number,
        required: true
    },
    HIGH: {
        type: Number,
        required: true
    },
    LOW: {
        type: Number,
        required: true
    },
    CLOSE: {
        type: Number,
        required: true
    },
    ADJUSTED_CLOSE: {
        type: Number,
        required: true
    },
    VOLUME: {
        type: Number,
        required: true
    },
    DIVIDEND: {
        type: Number,
        required: true
    },
    SPLIT_RATIO: {
        type: Number,
        required: true
    },
    SYMBOL: {
        type: String,
        required: true
    },


});

module.exports = Equity = mongoose.model('equities', EquitySchema);
