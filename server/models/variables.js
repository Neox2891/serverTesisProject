const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const variableSchema = new Schema({
    light: {
        type: Number,
    },
    fan: {
        type: Number,
    }
});

module.exports = mongoose.model('Variables', variableSchema);