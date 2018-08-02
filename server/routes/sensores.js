const express = require('express');
const Sensores = require('../models/sensores');
const app = express();

app.get('/sensores/datos', (req, res) => {

    let body = req.body;



});

app.post('/sensores/datos', (req, res) => {

    let body = req.body;

    let sensores = new Sensores({
        module1: {
            temperature: body.module1.temperature,
            humidity: body.module1.humidity,
            ammonia: body.module1.ammonia,
            light: body.module1.light,
            rain: body.module1.rain
        },
        module2: {
            temperature: body.module2.temperature,
            humidity: body.module2.humidity,
            ammonia: body.module2.ammonia
        },
        module3: {
            temperature: body.module3.temperature,
            humidity: body.module3.humidity,
            ammonia: body.module3.ammonia,
        },
        module4: {
            temperature: body.module4.temperature,
            humidity: body.module4.humidity,
            ammonia: body.module4.ammonia,
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