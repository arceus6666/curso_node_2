const fs = require('fs');
const uniqid = require('uniqid');

let listaTareas = [];

const crear = (descripcion) => {
  cargar();
  let tarea = {
    id: uniqid.time(),
    descripcion: descripcion,
    completado: false,
  };
  listaTareas.push(tarea);
  guardar();
  return tarea;
}

const lista = () => {
  cargar();
  return listaTareas;
}

const actualizar = (id, descripcion) => {
  cargar();
  const index = listaTareas.findIndex(item => item.id === id);
  if (index > -1) {
    listaTareas[index].descripcion = descripcion;
    guardar();
    return true;
  }
  return false;
}

const completar = (id) => {
  cargar();
  for (const i in listaTareas) {
    if (listaTareas[i].id === id) {
      listaTareas[i].completado = true;
      guardar();
      return true;
    }
  }
  return false;
}

const borrar = (id) => {
  cargar();
  const index = listaTareas.findIndex(item => item.id === id);
  if (index > -1) {
    listaTareas.splice(index, 1);
    guardar();
    return true;
  }
  return false;
}

const guardar = () => {
  const data = JSON.stringify(listaTareas, null, 2);
  fs.writeFile('./data/data.json', data, (err) => {
    if (err) throw new Error("No se pudo guardar los datos", err);
  });
}

const cargar = () => {
  try {
    listaTareas = require('../data/data.json');
  } catch (error) {
    listaTareas = [];
    // console.log(error);
  }
}

module.exports = {
  crear,
  lista,
  actualizar,
  completar,
  borrar,
}