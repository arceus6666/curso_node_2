const express = require('express');
const path = require('path');
const fs = require('fs');

const Categoria = require('../models/categoria');
const paginador = require('../middlewares/paginador');
const fileupload = require('express-fileupload');

const validarExtension = (file) => {
  const extensionesValidas = [
    'png',
    'jpg'
  ];
  const [nombre, extension] = file.split('.')
  if (extensionesValidas.indexOf(extension) < 0) return false;
  return true;
}

const router = express.Router();
router.use(fileupload());

router.get('/', paginador, async (req, res) => {
  // Categoria.where('estado', true).then(result => {
  //   return res.status(200).json(result);
  // }).catch(err => {
  //   return res.status(400).json({ mensaje: err });
  // });
  try {
    // console.log(req.paginacion.p, req.paginacion.r)
    const categoria = await Categoria.find({ estado: true }).skip(req.paginacion.p * req.paginacion.r).limit(req.paginacion.r).populate('usuario_id', 'nombre email');
    return res.status(200).json(categoria);
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
});

router.get('/buscar', async (req, res) => {
  try {
    const q = req.query.q;
    const regex = new RegExp(q, 'i');
    console.log(q, regex)
    const categoria = await Categoria.find({ estado: true, nombre: regex });
    return res.status(200).json(categoria);
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
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

router.put('/:id/imagen', async (req, res) => {
  if (!req.files) return res.status(400).json({ mensaje: 'No se seleccionó ninguna imagen' });
  const imagen = req.files.imagen;
  if (!validarExtension(imagen.name)) return res.status(400).json({ mensaje: 'No se admite el tipo de archivo' });
  try {
    const categoria = await Categoria.findById(req.params.id).where('estado', true);
    if (!categoria) return res.status(400).json({ mensaje: 'No se encontró la categoría' });
    const [nombre, extension] = imagen.name.split('.');
    const nombreArchivo = `${req.params.id}-${new Date().getTime()}.${extension}`;
    await imagen.mv(`uploads/${nombreArchivo}`);
    categoria.set({
      img: nombreArchivo
    });
    categoria.save();
    return res.status(200).json({ mensaje: 'Imagen subida exitosamente', data: categoria });
  } catch (error) {
    return res.status(500).json({ mensaje: error });
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

router.delete('/:id/imagen', async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id).where('estado', true);
    if (!categoria) return res.status(400).json({ mensaje: 'No se encontró la categoría' });
    const pathImagen = path.resolve(__dirname, `../uploads/${categoria.img}`);
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
      categoria.set({
        img: null
      });
      categoria.save();
      return res.status(200).json({ mensaje: 'La imagen se borró correctamente' });
    }
    categoria.set({
      img: null
    });
    categoria.save();
    return res.status(400).json({ mensaje: 'El archivo no existe' });
  } catch (error) {
    return res.status(400).json({ mensaje: error });
  }
});

module.exports = router;
