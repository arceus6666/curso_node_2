const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/usuario', (req, res) => {
  res.send('usuario por get');
});

router.post('/usuario', (req, res) => {
  let usuario = new Usuario({
    nombre: req.body.nombre,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    rol: req.body.rol
  });
  try {
    usuario.save((err, db) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        res.status(201).json({ usuario: db });
      }
    });
  } catch (error) {

  }
});

router.put('/usuario', (req, res) => {
  res.send('usuario por put');
});

router.delete('/usuario', (req, res) => {
  res.send('usuario por delete');
});

module.exports = router;