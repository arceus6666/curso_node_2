const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/:img', (req, res) => {
  const pathImagen = path.resolve(__dirname, `../uploads/${req.params.img}`);
  const pathDefault = path.resolve(__dirname, `../assets/default.png`);
  if (!fs.existsSync(pathImagen)) return res.sendFile(pathDefault);
  return res.sendFile(pathImagen);
});

module.exports = router;