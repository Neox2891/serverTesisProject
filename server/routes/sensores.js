const express = require('express');
const Sensores = require('../models/sensores');
const app = express();

app.get('/sensores/datos', (req, res) => {

    let body = req.body;



});

app.post('/sensores/datos', (req, res) => {

    let body = req.body;

    let sensores = new Sensores({
        temperature: body.temperature,
        humidity: body.humidity,
        ammonia: body.ammonia,
        fire: body.fire,
        others: {
            rain: body.others.rain,
            light: body.others.light
        },
        date: {
            day: new Date().getDay(),
            numberDay: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            fullDate: new Date()
        },
        actuadores: body.actuadores
    });

    sensores.save((err, sensoresDb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            sensoresDb
        });
    });

});


module.exports = app;