const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();

const server = http.createServer(app);

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

const io = socketIO(server);

io.on('connection', (client) => {
  // console.log(client);
  console.log('Usuario conectado');
  client.on('disconnect', () => {
    console.log('Usuario desconectado');
  });

  client.on('enviarMensaje', (data, callback) => {
    console.log(data)
    callback(client.id);
  });

  client.on('enviarMensaje2', (data, callback) => {
    console.log(data)
    callback(`${client.id}-2`);
  });

  client.emit('enviarMensaje', {
    nombre: 'Admin',
    mensaje: 'Bienvenido'
  });

  client.broadcast.emit('enviarMensaje', {
    nombre: 'Admin',
    mensaje: 'A todos'
  });
});



server.listen(8010, () => {
  console.log('Escuchando el puerto 8010');
});
