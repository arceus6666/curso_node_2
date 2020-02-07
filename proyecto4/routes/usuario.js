const express = require('express');
const Usuario = require('../models/usuario');

const router = express.Router();

router.get('/', async (req, res) => {
  // const usuarios = Usuario.find({});
  // Usuario.find({},(err,db)=>{...});
  // Usuario.find({}).then(result => {
  Usuario.where('estado', true).then(result => {
    return res.status(200).json(result);
  }).catch(err => {
    return res.status(400).json({ mensaje: err });
  });
});

router.get('/:id', (req, res) => {
  // Usuario.findById(req.params.id).then(result => {
  Usuario.findById(req.params.id).where('estado', true).then(result => {
    return res.status(200).json(result);
  }).catch(err => {
    return res.status(400).json({ mensaje: err });
  });
});

router.post('/crear', async (req, res) => {
  let usuario = new Usuario({
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
    rol: req.body.rol
  });
  try {
    // usuario.save((err, db) => {
    //   if (err) {
    //     res.status(400).json({ message: err });
    //   } else {
    //     res.status(201).json({ usuario: db });
    //   }
    // });
    const nuevo = await usuario.save();
    return res.status(201).json({ usuario: nuevo });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// router.put('/:id/actualizar', (req, res) => {
// Usuario.findByIdAndUpdate(
//   req.params.id,
//   req.body,
//   { new: true, /*para usar validadores*/runValidators: true },
//   (err, data) => {
//     if (err) return res.status(400).json({ mensaje: err });
//     return res.status(200).json(data);
//   }
// );
// });

router.put('/:id/actualizar', async (req, res) => {
  // const usuario = await Usuario.findById(req.params.id);
  const usuario = await Usuario.findById(req.params.id).where('estado', true);
  if (!usuario) return res.status(404).json({ mensaje: 'No se encuentra el usuario' });
  usuario.set(req.body);
  try {
    await usuario.save();
    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error)
    return res.status(400).json({ mensaje: error });
  }
});

// router.delete('/:id/borrar', (req, res) => {
//   Usuario.findByIdAndRemove(req.params.id).then(result => {
//     return res.status(200).json(result);
//   }).catch(err => {
//     return res.status(400).json({ mensaje: err });
//   }); 
// });

router.delete('/:id/borrar', async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  usuario.set({ estado: false });
  try {
    await usuario.save();
    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error)
    return res.status(400).json({ mensaje: error });
  }
});

module.exports = router;