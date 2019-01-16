const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MutualSchema = new Schema({
    SC: {
        type: String,
        required: true
    },
    NAME: {
        type: String,
        required: true
    },
    NAV: {
        type: Number,
        required: true
    },
    RP: {
        type: Number,
    },
    SP: {
        type: Number,
    },
    DATE: {
        type: String,
        required: true
    }
}
);

module.exports = Mutual = mongoose.model('mutuals', MutualSchema);
