const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');

const rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El email es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio'],
    select: false
  },
  img: {
    type: String,
    required: false
  },
  rol: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  estado: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    // default: Date.now()
  },
  updated_at: {
    type: Date,
    // default: Date.now()
  }
});

usuarioSchema.pre('save', function (next) {
  if (this.isNew) {
    // this.created_at = Date.now();
    this.created_at = moment().tz('America/La_Paz');
  } else {
    // this.updated_at = Date.now();
    this.updated_at = moment().tz('America/La_Paz');
  }
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" })

module.exports = mongoose.model('Usuario', usuarioSchema);