const crearMensaje = (nombre, mensaje) => {
  return {
    nombre,
    mensaje,
    fecha: Date.now()
  };
}

module.exports = {
  crearMensaje
}
