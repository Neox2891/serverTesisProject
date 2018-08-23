const express = require('express');
const Sensores = require('../models/sensores');
const app = express();

// obtener datos del dia
app.get('/sensores/datos', (req, res) => {

    let body = req.body;

    let dates = new Date();
    let dateNow = `${dates.getDay()}/${dates.getMonth()}/${dates.getFullYear()}`;

    Sensores.find({ dateSearch: dateNow }, 'temperature humidity ammonia others')
        .exec((err, sensorDB) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    err: err
                });
            }

            if (sensorDB.length === 0) {
                return res.json({
                    ok: false,
                    message: 'Datos no encontrados'
                });
            }

            res.status(200).json({
                ok: true,
                sensorDB
            });
        });
});

// Buscar datos por fecha
app.get('/sensores/datos/search', (req, res) => {

    let search = req.query.dateSearch;

    Sensores.find({ dateSearch: search })
        .exec((err, sensorDB) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    err: err
                });
            }

            if (sensorDB.length === 0) {
                return res.json({
                    ok: false,
                    err: {
                        message: 'Datos no encontrados'
                    }
                });
            }

            res.status(200).json({
                ok: true,
                sensorDB
            });
        });
});

// Guardar datos
app.post('/sensores/datos', (req, res) => {

    let body = req.body;

    let date = new Date();

    let sensores = new Sensores({
        temperature: body.temperature,
        humidity: body.humidity,
        ammonia: body.ammonia,
        fire: body.fire,
        others: {
            rain: body.others.rain,
            light: body.others.light
        },
        dateSearch: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
        date: {
            day: date.getDay(),
            numberDay: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
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

//obtener datos por mes
app.get('/sensores/datos/mes', (req, res) => {

    Sensores.find((err, sensorDB) => {

        if (err) {
            return res.status(501).json({
                ok: false,
                err
            })
        }
        console.log(sensorDB);
        let tempArray = [];
        let resultado = 0;
        let resultadoAutomatico = 0;

        sensorDB.forEach((element, index) => {
            if (element.date.month === '8') {
                element.temperature.forEach(element => {
                    resultado += element;
                    tempArray.push(element);
                });
            }
        });
        console.log(tempArray);
        tempArray.forEach(element => {
            resultadoAutomatico += element;
        });
        console.log(resultadoAutomatico);
        res.status(200).json({
            ok: true,
            resultadoManual: resultado / 48,
            resultadoAuto: resultadoAutomatico / tempArray.length
        });
    });

});

module.exports = app;