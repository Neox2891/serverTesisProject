const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let sensoresSchema = new Schema({

    module1: {
        temperature: Number,
        humidity: Number,
        ammonia: Number,
        light: Number,
        rain: Number
    },
    module2: {
        temperature: Number,
        humidity: Number,
        ammonia: Number
    },
    module3: {
        temperature: Number,
        humidity: Number,
        ammonia: Number
    },
    module4: {
        temperature: Number,
        humidity: Number,
        ammonia: Number
    },
    date: {
        day: String,
        numberDay: String,
        month: String,
        year: String,
        hours: String,
        minutes: String,
        fullDate: String
    },
    actuadores: [Boolean]
});

module.exports = mongoose.model('Sensores', sensoresSchema);