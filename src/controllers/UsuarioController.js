// src/controllers/UsuarioController.js
const Usuario = require("../models/Usuario");
const UsuarioService = require("../services/UsuarioService");
const bcrypt = require("bcryptjs");

class UsuarioController {
  async criarUsuario(req, res) {
    try {
      // Verifica se o email já está cadastrado
      const usuarioExistente = await Usuario.findOne({
        where: { email: req.body.email },
      });

      if (usuarioExistente) {
        return res.status(400).json({ error: "Email já cadastrado!" });
      }

      const usuarioData = {
        ...req.body,
      };
      // Hash da senha antes de salvar no banco de dados
      const hashedPassword = await bcrypt.hash(usuarioData.senha, 10); // 10 é o número de salt rounds

      // Substitui a senha original pela versão hashada
      usuarioData.senha = hashedPassword;

      const usuario = await UsuarioService.criarUsuario(usuarioData);
      return res.status(201).json(usuario);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  async buscarTodosUsuarios(req, res) {
    try {
      const usuarios = await UsuarioService.buscarTodosUsuarios();
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  async buscarUsuarioPorId(req, res) {
    try {
      const usuario = await UsuarioService.buscarUsuarioPorId(req.params.id);
      if (usuario) {
        return res.status(200).json(usuario);
      }
      return res.status(404).json({ error: "Usuário não encontrado" });
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async atualizarUsuario(req, res) {
    try {
      const usuario = await UsuarioService.atualizarUsuario(
        req.params.id,
        req.body
      );
      if (usuario) {
        return res.status(200).json(usuario);
      }
      return res.status(404).json({ error: "Usuário não encontrado" });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  async excluirUsuario(req, res) {
    try {
      const usuario = await UsuarioService.excluirUsuario(req.params.id);
      if (usuario) {
        return res
          .status(200)
          .json({ message: "Usuário deletado com sucesso", usuario });
      }
      return res.status(404).json({ error: "Usuário não encontrado" });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  }

  async loginUsuario(req, res) {
    const { email, password } = req.body; // Recebendo email e senha do cliente

    try {
      const usuario = await UsuarioService.buscarUsuarioPorEmail(email);

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const senhaCorreta = await bcrypt.compare(password, usuario.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

      // Se a senha for correta, retorna o usuário (sem a senha)
      return res.status(200).json({
        sucess: true,
        user: {
          id: usuario.id,
          name: usuario.name,
          email: usuario.email,
        },
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      return res
        .status(500)
        .json({ message: "Erro ao realizar login. Tente novamente!" });
    }
  }
}

module.exports = new UsuarioController();
