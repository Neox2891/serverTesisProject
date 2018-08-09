const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let sensoresSchema = new Schema({

    temperature: [Number],
    humidity: [Number],
    ammonia: [Number],
    fire: [Number],
    others: {
        light: Number,
        rain: Number
    },
    dateSearch: String,
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