const mongoose = require('mongoose');


let Schema = mongoose.Schema;


let notificarSchema = new Schema({
    notificacion: String,
    date: String,
    email: String
});

module.exports = mongoose.model('Notificaciones', notificarSchema);