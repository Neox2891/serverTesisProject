const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let sensoresSchema = new Schema({

    temperature: [Number],
    humidity: [Number],
    airQuality: [Number],
    fire: [Number],
    others: {
        light: Number,
        rain: Number
    },
    dateSearch: String,
    date: {
        day: Number,
        month: Number,
        year: Number,
        hours: Number,
        minutes: Number,
        fullDate: String
    },
    actuadores: [Boolean]
});

module.exports = mongoose.model('Sensores', sensoresSchema);