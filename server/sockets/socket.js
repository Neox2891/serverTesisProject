const { io } = require('../server');
const Notificar = require('../models/notificacion');

let humidity = false;

io.on('connection', (client) => {

    client.on('connect', () => {
        console.log('Usuario conectado');
    });

    client.on('disconnect', () => {
        console.log('Usuario conectado');
    });

    client.emit('mensajeBienvenida', {
        admin: 'Bienvenido'
    });

    // Comunicacion en tiempo real
    client.on('dataSensors', (data, callback) => {
        //console.log(typeof data);
        console.log(JSON.stringify(data, null, 2));
        client.broadcast.emit('dataEmit', data);
    });

    //  Actualiza grafica cada vez que se guardan datos en la DB
    client.on('dataDb', (data, callback) => {
        client.broadcast.emit('dataDbEmit', data);
        callback({
            ok: true,
            msg: 'datos recibidos!'
        });
    });
    // notificaciones
    client.on('nfTemperature', (data, cb) => {
        client.broadcast.emit('nfTemp', data);
    });

    client.on('nfHumidity', (data, cb) => {
        client.broadcast.emit('nfHumi', data);

        let notificar = new Notificar({});
        if (data.humidity > 60 && humidity == false) {
            notificar.notificacion = `Alerta Humedad Alta: ${data.humidity}`;
            notificar.date = new Date();
            notificar.email = 'n.estrada2891@gmail.com';

            notificar.save((err, notificacion) => {
                if (err) {
                    throw err;
                }
                console.log('Nf humedad guardada en DB');
            });
            humidity = true;
        }

        cb({
            ok: true,
            msg: 'Datos humedad recibidos'
        });
    });

    client.on('nfAmmonia', (data, cb) => {
        client.broadcast.emit('nfAmmo', data);
    });

    client.on('nfFire', (data, cb) => {
        client.broadcast.emit('nfFire', data);
    });

    client.on('nfRain', (data, cb) => {
        client.broadcast.emit('nfrain', data);
    });

});