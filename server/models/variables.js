const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const variableSchema = new Schema({
    light: {
        type: Number,
        required: true
    },
    fan: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Variables', variableSchema);