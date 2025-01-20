const Usuario = require("../models/Usuario");

class UsuarioRepository {
  // Método para criar usuário
  async CriarUsuario(data) {
    try {
      return await Usuario.create(data);
    } catch (error) {
      console.error("Erro ao criar usuário!", error);
      throw new error("Erro ao criar usuário!");
    }
  }

  // Método para buscar todos usuários
  async buscarUsuarios() {
    try {
      return await Usuario.findAll();
    } catch (error) {
        console.error('Erro ao buscar usuarios', error);
        throw new error('erro ao buscar usuario');
    }
  }
}

module.exports = new UsuarioRepository();