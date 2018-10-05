const mongoose = require('mongoose');


let Schema = mongoose.Schema;


let notificarSchema = new Schema({
    notificacion: String,
    module: String,
    parameter: String,
    data: Number,
    date: String,
    email: String
});

module.exports = mongoose.model('Notificaciones', notificarSchema);