const { io } = require('../server');
const Notificar = require('../models/notificacion');
const nodemailer = require('nodemailer');

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
        callback({
            ok: true,
            msg: 'datos recibidos!'
        });
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

        let notificar = new Notificar({});

        if (data.temperature > 35) {
            notificar.notificacion = `Alerta temperatura Alta: ${data.temperature}`;
            sendMailNf('Temperatura alta', 'Alerta Temperatura', `${data.temperature}°C`, data.module);
        }
        if (data.temperature < 34) {
            notificar.notificacion = `Alerta temperatura baja: ${data.temperature}`;
            sendMailNf('Temperatura baja', 'Alerta Temperatura', `${data.temperature}°C`, data.module);
        }

        notificar.module = data.module;
        notificar.parameter = 'Temperatura';
        notificar.data = data.temperature;
        notificar.date = new Date();
        notificar.email = 'n.estrada2891@gmail.com';

        notificar.save((err, notificacion) => {
            if (err) {
                throw err;
            }
            console.log('Nf temperatura guardada en DB');
        });

        cb({
            ok: true,
            msg: 'Datos temperatura recibidos'
        });
    });

    client.on('nfHumidity', (data, cb) => {
        client.broadcast.emit('nfHumi', data);

        let notificar = new Notificar({});

        if (data.humidity > 60) {
            notificar.notificacion = `Alerta Humedad Alta: ${data.humidity}`;
        }
        if (data.humidity < 30) {
            notificar.notificacion = `Alerta Humedad baja: ${data.humidity}`;
        }
        notificar.date = new Date();
        notificar.email = 'n.estrada2891@gmail.com';

        notificar.save((err, notificacion) => {
            if (err) {
                throw err;
            }
            console.log('Nf humedad guardada en DB');
        });

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

let sendMailNf = (msg, subject, parameter, modulo) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'csa.notification@gmail.com', // generated ethereal user
            pass: 'Juniortupapa.1' // generated ethereal password
        }
    });

    let mailOptions = {
        from: '"CSA Systems" <csa.notification@gmail.com>', // sender address
        to: 'n.estrada2891@gmail.com', // list of receivers
        subject: subject, // Subject line
        html: `
        <h2>Alerta: </h2>
        <h3>Detalles</h3>
        <ul>
        <li>${msg}: ${parameter}</li>
        <li>Modulo: ${modulo}</li>
        </ul>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });


}