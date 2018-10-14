const express = require('express');
const Sensores = require('../models/sensores');
let { rezoned } = require('../config/config');
const { getDataDay } = require('../helpers/getDataDay');
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
app.get('/sensores/datos/:mes', (req, res) => {

    let month = req.params.mes;

    const months = [{ id: 1, month: 'enero' }, { id: 2, month: 'febrero' }, { id: 3, month: 'marzo' }, { id: 4, month: 'abril' }, { id: 5, month: 'mayo' }, { id: 6, month: 'junio' }, { id: 7, month: 'julio' },
        { id: 8, month: 'agosto' }, { id: 9, month: 'septiembre' }, { id: 10, month: 'octubre' }, { id: 11, month: 'noviembre' },
        { id: 12, month: 'diciembre' }
    ];

    let monthid = months.find(element => element.month === month);

    Sensores.find({ 'date.month': monthid.id })
        .exec((err, sensorDB) => {

            if (err) {
                return res.status(501).json({
                    ok: false,
                    err
                })
            }
            // console.log(sensorDB);

            metrics.month = monthid.month;

            res.status(200).json({
                ok: true,
                metrics
            });
        });

});

module.exports = app;