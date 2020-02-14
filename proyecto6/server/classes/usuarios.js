class Usuarios {
  constructor() {
    this.usuarios = [];
  }

  addUsuario(id, nombre) {
    const usuario = { id, nombre };
    this.usuarios.push(usuario);
    return this.usuarios;
  }

  getUsuario(id) {
    const usuario = this.usuarios.find(u => u.id === id);
    return usuario;
  }

  getUsuarios() {
    return this.usuarios;
  }

  deleteUsuario(id) {
    const usuarioBorrado = this.getUsuario(id);
    this.usuarios = this.usuarios.filter(u => u.id !== id);
    return usuarioBorrado;
  }
}

module.exports = { Usuarios }