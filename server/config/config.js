//Configuracion del puerto
process.env.PORT = process.env.PORT || 3000;

//Configuracion del entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Configuracion base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/csa_db';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URL_DB = urlDB;