const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/:img', (req, res) => {
  const pathImagen = path.resolve(__dirname, `../uploads/${req.params.img}`);
  if (!fs.existsSync(pathImagen)) return res.status(404).json({ mensaje: 'No existe el recurso' });
  return res.sendFile(pathImagen);
});

module.exports = router;