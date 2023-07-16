const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({

    term: {
        type: String,
        required: true,
        lowercase: true
    },
    name: {
        type: String,
    },
    savedAt: {
        type: Date,
        default: () => Date.now(),
    },
    searchData: {
        type: Object
    }

});

module.exports = mongoose.model('Search', searchSchema);