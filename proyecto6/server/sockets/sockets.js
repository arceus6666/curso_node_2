const { io } = require('../../index');
const Usuarios = require('../classes/usuarios').Usuarios;
const { crearMensaje } = require('../utils/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {

  client.on('entrarChat', (data, callback) => {
    client.join('general');
    usuarios.addUsuario(client.id, data.nombre);
    client.broadcast.to('general').emit('listarUsuarios', usuarios.getUsuarios());
    client.broadcast.to('general').emit('crearMensaje', crearMensaje('Admin', `${data.nombre} se unió!`));
    // callback();
  });

  client.on('crearMensaje', (data, callback) => {
    const usuario = usuarios.getUsuario(client.id);
    const mensaje = crearMensaje(usuario.nombre, data.mensaje);

    client.broadcast.to('general').emit('crearMensaje', mensaje);
  });

  client.on('disconnect', (data) => {
    const usuario = usuarios.deleteUsuario(client.id);
    client.broadcast.to('general').emit('crearMensaje', crearMensaje('Admin', `${usuario.nombre} salió!`));
    client.broadcast.to('general').emit('listarUsuarios', usuarios.getUsuarios());
  });

});


