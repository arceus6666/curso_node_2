const argsv = require('./config/yargs').argsv;
const Tarea = require('./todo/tarea');

let command = argsv._[0];

switch (command) {
  case 'crear':
    const tareaCreada = Tarea.crear(argsv.descripcion);
    console.log(tareaCreada);
    // console.log(argsv.descripcion)
    break;
  case 'lista':
    const lista = Tarea.lista();
    // console.log(lista);
    lista.forEach(item => {
      console.log('ID:', item.id);
      console.log('Descripción:', item.descripcion);
      console.log('Completado:', item.completado);
    });
    break;
  case 'actualizar':
    const resultado = Tarea.actualizar(argsv.id, argsv.descripcion);
    if (resultado) {
      console.log('Actualizó la tarea.');
    } else {
      console.log('No se pudo actualizar.');
    }
    break;
  case 'completar':
    if (Tarea.completar(argsv.id)) {
      console.log('Tarea completada.');
    } else {
      console.log('No se completó la tarea.');
    }
    break;
  case 'borrar':
    if (Tarea.borrar(argsv.id)) {
      console.log('Tarea borrada.');
    } else {
      console.log('No se borró la tarea.');
    }
    break;
  default:
    console.error('Comando invalido.');
    break;
}

// console.log(command);