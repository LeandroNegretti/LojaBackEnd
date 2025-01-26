const express = require("express");
const usuarioController = require("../controllers/UsuarioController");
//const autenticarToken = require("../middleware/authMiddleware");

const router = express.Router();

// Rota para listar todos os usuários
router.get("/usuarios", usuarioController.buscarTodosUsuarios);

// Rota para criar um usuario
router.post("/usuarios", usuarioController.criarUsuario);

// Rota para buscar um usuário por ID
router.get("/usuarios/:id", usuarioController.buscarUsuarioPorId);

// Rota para atualizar um usuário por ID
router.put("/usuarios/:id", usuarioController.atualizarUsuario);

// Rota para excluir um usuário por ID
router.delete("/usuarios/:id", usuarioController.excluirUsuario);

// Rota para login de usuário
router.post("/usuarios/login", usuarioController.loginUsuario);

module.exports = router;
