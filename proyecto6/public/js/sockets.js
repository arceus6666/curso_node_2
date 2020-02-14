var socket = io();

// Conexion con el servidor establecida
socket.on('connect', function () {
  socket.emit('entrarChat', { nombre: 'Usuario' });
});

socket.on('crearMensaje', function (mensaje) {
  // alert(data)
  console.log(mensaje)
  // alert(mensaje);
});

$("#enviar").click(function (event) {
  // console.log('works');
  socket.emit('crearMensaje', { mensaje: 'Hola a todos' });
});

// conexion con el servidor finalizada
socket.on('disconnect', function () {
  console.log('Perdimos la conexion con el servidor');
});



