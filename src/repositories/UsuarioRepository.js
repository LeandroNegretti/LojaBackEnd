const Usuario = require("../models/Usuario");

class UsuarioRepository {
  // Método para criar usuário
  async criarUsuario(data) {
    try {
      return await Usuario.create(data);
    } catch (error) {
      console.error("Erro ao criar usuário!", error);
      throw new Error("Erro ao criar usuário!");
    }
  }

  // Método para buscar todos usuários
  async buscarTodosUsuarios() {
    try {
      return await Usuario.findAll();
    } catch (error) {
        console.error('Erro ao buscar usuarios', error);
        throw new Error('erro ao buscar usuario');
    }
  }

  // Método para buscar usuário pelo ID
  async buscarUsuarioPorId(id) {
    try {
      const usuario = await Usuario.findByPk();
      if (!usuario) {
        return null; // Retorna null caso o usuário não seja encontrado
      }
      return usuario;
    } catch (error) {
      console.error(`Erro ao buscar usuário com id ${id}:`, error);
      throw new Error('Erro ao buscar usuários');
    }
  }

  // Método para atualizar um usuário
  async atualizarUsuario(id, data) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        await usuario.update(data, { where: {id} });
        return await Usuario.findByPk(id) // Retorna o usário atualizado
      }
      return null;
    } catch (error) {
      console.error(`Erro ao atualizar usuário com id ${id}:`, error);
      throw new Error('Erro ao atualizar usuário');
    }
  }

  // Método para excluir um usuário
  async excluirUsuario(id) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        await usuario.destroy(); // Exclui o usuário
        return usuario;
      }
      return null; // Retorna null caso o usuário não seja encontrado
    } catch (error) {
      console.error(`Erro ao excluir um usuário com id ${id}:`, error);
      throw new Error('Erro ao excluir usuário');
    }
  }
}

module.exports = new UsuarioRepository();