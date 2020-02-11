const express = require('express');
const Categoria = require('../models/categoria');

const router = express.Router();

router.get('/', async (req, res) => {
  Categoria.where('estado', true).then(result => {
    return res.status(200).json(result);
  }).catch(err => {
    return res.status(400).json({ mensaje: err });
  });
});

router.get('/:id', (req, res) => {
  Categoria.findById(req.params.id).where('estado', true).then(result => {
    return res.status(200).json(result);
  }).catch(err => {
    return res.status(400).json({ mensaje: err });
  });
});

router.post('/crear', async (req, res) => {
  let categoria = new Categoria({
    nombre: req.body.nombre,
    usuario_id: req.usuario
  });
  try {
    const nuevo = await categoria.save();
    return res.status(201).json({ categoria: nuevo });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.put('/:id/actualizar', async (req, res) => {
  const categoria = await Categoria.findById(req.params.id).where('estado', true);
  if (!categoria) return res.status(404).json({ mensaje: 'No se encuentra la categoria' });
  categoria.set({
    nombre: req.body.nombre,
    usuario_id: req.usuario
  });
  try {
    await categoria.save();
    return res.status(200).json(categoria);
  } catch (error) {
    console.log(error)
    return res.status(400).json({ mensaje: error });
  }
});

router.delete('/:id/borrar', async (req, res) => {
  const categoria = await Categoria.findById(req.params.id);
  categoria.set({ estado: false });
  try {
    await categoria.save();
    return res.status(200).json(categoria);
  } catch (error) {
    console.log(error)
    return res.status(400).json({ mensaje: error });
  }
});

module.exports = router;
