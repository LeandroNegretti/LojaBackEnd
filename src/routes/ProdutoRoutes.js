// src/routes/produtoRouter.js
const express = require('express');
const produtoController = require('../controllers/ProdutoController');

const router = express.Router();

// Rota para listar todos os produtos
router.get('/produtos', produtoController.listarTodosProdutos);

// Rota para criar um novo produto
router.post('/produtos', produtoController.criarProduto);

// Rota para buscar um produto por ID
router.get('/produtos/:id', produtoController.buscarProdutosPorId);

// Rota para atualizar um produto existente
router.put('/produtos/:id', produtoController.atualizarProduto);

// Rota para deletar um produto
router.delete('/produtos/:id', produtoController.deletarProduto);

module.exports = router;
