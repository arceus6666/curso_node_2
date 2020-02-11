const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.body.email });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario o contraseña incorrecto' });
    if (!bcrypt.compareSync(req.body.password, usuario.password)) return res.status(404).json({ mensaje: 'Usuario o contraseña incorrecto' });
    const token = jwt.sign({ usuario_id: usuario._id, usuario_email: usuario.email, usuario_rol: usuario.rol, usuario_estado: usuario.estado }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });
    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json({ mensaje: error });
  }
});

module.exports = router;