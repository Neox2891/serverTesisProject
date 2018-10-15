const express = require('express');
const Sensores = require('../models/sensores');
let { rezoned } = require('../config/config');
const { getDataDay } = require('../helpers/getDataDay');
const { getDataMonth } = require('../helpers/getDataMonth');
const app = express();

let date = rezoned().date[0];

// obtener datos del dia / aaaa-mm-dd
app.get('/sensores/datos', (req, res) => {

    Sensores.find({ dateSearch: date })
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

            const metrics = getDataDay(sensorDB);

            res.status(200).json({
                ok: true,
                metrics
            });
        });
});

// Buscar datos por fecha / aaaa-mm-dd ejemplo: 1991-11-28
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

            const metrics = getDataDay(sensorDB);

            res.status(200).json({
                ok: true,
                metrics
            });
        });
});

//obtener datos por dia
app.get('/sensores/datos/:mesAno', (req, res) => {

    let mesAno = req.params.mesAno.split('-');

    let month = mesAno[0];
    let year = mesAno[1];

    const months = [{ id: 1, month: 'enero', days: 31 }, { id: 2, month: 'febrero', days: 28 },
        { id: 3, month: 'marzo', days: 31 }, { id: 4, month: 'abril', days: 30 }, { id: 5, month: 'mayo', days: 31 },
        { id: 6, month: 'junio', days: 30 }, { id: 7, month: 'julio', days: 31 }, { id: 8, month: 'agosto', days: 31 },
        { id: 9, month: 'septiembre', days: 30 }, { id: 10, month: 'octubre', days: 31 },
        { id: 11, month: 'noviembre', days: 30 }, { id: 12, month: 'diciembre', days: 31 }
    ];

    let monthid = months.find(element => element.month === month);

    Sensores.find({ 'date.month': monthid.id, 'date.year': year })
        .exec((err, sensorDB) => {

            if (err) {
                return res.status(501).json({
                    ok: false,
                    err
                })
            }

            if (sensorDB.length === 0) {
                return res.json({
                    ok: false,
                    err: {
                        message: 'Datos no encontrados'
                    }
                });
            }

            let metrics = getDataMonth(sensorDB, monthid.days);

            res.status(200).json({
                ok: true,
                metrics
            });
        });
});

module.exports = app;