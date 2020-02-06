const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let lenguajeSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  extension: {
    type: String,
    required: [true, 'La extension es obligatoria']
  },
});

module.exports = mongoose.model('Lenguaje', lenguajeSchema);