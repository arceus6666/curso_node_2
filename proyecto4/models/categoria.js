const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  estado: {
    type: Boolean,
    default: true
  },
  img: {
    type: String,
    default: null
  },
  usuario_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Usuario'
  }
});

module.exports = mongoose.model('Categoria', categoriaSchema);