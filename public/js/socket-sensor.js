var socket = io();

socket.on('connect', function() {
    console.log('Conectado con el servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('mensajeBienvenida', (data, callback) => {
    console.log(data);
});

// Se recibe los datos en tiempo real
socket.on('dataEmit', (data, callback) => {
    console.log(data);
    var dataParse = JSON.parse(data);
    if (data) {
        document.getElementById("temperatura").innerHTML = `${dataParse.temperature}°C`;
        document.getElementById("humedad").innerHTML = `${dataParse.humidity}%`;
    }
});

// Actualizar grafica cada ves que se guardan en la DB
socket.on('dbEmit', (data, callback) => {
    console.log('DATADB!!!', data);
});

// notificaciones:
// Temperatura
socket.on('nfTemp', (data, callback) => {
    console.log(data);
});
// humedad
socket.on('nfHumi', (data, callback) => {
    console.log(data);
});
// calidad de aire
socket.on('nfAmmo', (data, callback) => {
    console.log(data);
});
// fuego 
socket.on('nfFire', (data, callback) => {
    console.log(data);
});
// lluvia
socket.on('nfRain', (data, callback) => {
    console.log(data);
});