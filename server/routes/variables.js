const express = require('express');
const Variables = require('../models/variables');
const app = express();

app.get('/variables', (req, res) => {

    Variables.find((err, variablesDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let latestVariable = variablesDB[variablesDB.length - 1];

        res.status(200).json({
            ok: true,
            latestVariable
        });

    });

});

app.post('/variables', (req, res) => {

    let light = req.body.light;
    let fan = req.body.fan;

    let variables = new Variables({
        light: light,
        fan: fan
    });

    variables.save((err, variablesDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            variablesDB
        });

    });
});

module.exports = app;