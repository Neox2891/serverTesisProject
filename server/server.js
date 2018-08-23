require('./config/config');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');
const app = express();

let server = http.createServer(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/index'));

module.exports.io = socketIO(server);
require('./sockets/socket');
/*
mongoose.connect(process.env.URL_DB, { useNewUrlParser: true }, (err) => {

    if (err) {
        throw err;
    }

    console.log('Conectado con base de datos!');
});
*/
server.listen(process.env.PORT, (err) => {

    if (err) {
        throw err;
    }

    console.log(`Escuchando en el puerto ${process.env.PORT}`);
});