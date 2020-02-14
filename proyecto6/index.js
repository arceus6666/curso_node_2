const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();

const server = http.createServer(app);

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

module.exports.io = socketIO(server);

require('./server/sockets/sockets')


server.listen(8010, () => {
  console.log('Escuchando el puerto 8010');
});
