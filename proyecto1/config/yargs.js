const argsv = require('yargs')
.command('crear', 'Crear una tarea por hacer', {
  descripcion: {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer.'
  }
})
.command('actualizar', 'Actualiza una tarea', {
  id: {
    demand: true,
    alias: 'i',
    desc: 'Id actual de la tarea.'
  },
  descripcion: {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea.'
  }
})
.command('completar', 'Finaliza una tarea', {
  id: {
    demand: true,
    alias: 'i',
    desc: 'Id de la tarea.'
  }
})
.command('borrar', 'Borra una tarea', {
  id: {
    demand: true,
    alias: 'i',
    desc: 'Id de la tarea.'
  }
})
.help().argv;

module.exports = { argsv }