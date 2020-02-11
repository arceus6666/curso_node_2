const Usuario = require('../models/usuario');

const verificaUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.usuario);
    if (!usuario) return res.status(401).json({ mensaje: 'Usuario inexistente' });
    if (!usuario.estado) return res.status(401).json({ mensaje: 'Usuario deshabilitado' });
    next();
  } catch (error) {
    return res.status(500).json({ mensaje, error });
  }
}

module.exports = verificaUsuario