const express = require('express');
const Lenguaje = require('../models/lenguaje');

const router = express.Router();

router.get('/lenguaje', (req, res) => {
  res.send('lenguaje por get');
});

router.post('/lenguaje', (req, res) => {
  let lenguaje = new Lenguaje({
    nombre: req.body.nombre,
    extension: req.body.extension
  });
  try {
    lenguaje.save((err, db) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        res.status(201).json({ lenguaje: db });
      }
    });
  } catch (error) {

  }
});

router.put('/lenguaje', (req, res) => {
  res.send('lenguaje por put');
});

router.delete('/lenguaje', (req, res) => {
  res.send('lenguaje por delete');
});

module.exports = router;