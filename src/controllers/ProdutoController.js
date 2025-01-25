import ProdutoService from '../services/ProdutoService.js';

class ProdutoController {
  // Listar todos os produtos
  async listarTodosProdutos(req, res) {
    try {
      const produtos = await ProdutoService.listarTodosProdutos();
      return res.status(200).json(produtos);
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Erro ao listar produtos. ", erro: error.message });
    }
  }

  // Biscar um produto por ID

  async buscarProdutosPorId(req, res) {
    try {
      const { id } = req.params;
      const produto = await ProdutoService.buscarProdutosPorId(id);

      if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado. " });
      }

      return res.status(200).json(produto);
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Erro ao buscar produto.", erro: error.message });
    }
  }

  // 3. Criar um novo produto
  async criarProduto(req, res) {
    try {
      const dadosProduto = req.body;
      const novoProduto = await ProdutoService.criarProduto(dadosProduto);

      return res.status(201).json(novoProduto);
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Erro ao criar produto.", erro: error.message });
    }
  }

  // 4. Atualizar um produto existente
  async atualizarProduto(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;

      const produtoAtualizado = await ProdutoService.atualizarProduto(
        id,
        dadosAtualizados
      );

      return res.status(200).json(produtoAtualizado);
    } catch (error) {
      if (error.message === "Produto não encontrado") {
        return res.status(404).json({ mensagem: error.message });
      }

      return res
        .status(500)
        .json({ mensagem: "Erro ao atualizar produto.", erro: error.message });
    }
  }

  // 5. Deletar um produto
  async deletarProduto(req, res) {
    try {
      const { id } = req.params;

      const mensagem = await ProdutoService.deletarProduto(id);

      return res.status(200).json(mensagem);
    } catch (error) {
      if (error.message === "Produto não encontrado") {
        return res.status(404).json({ mensagem: error.message });
      }

      return res
        .status(500)
        .json({ mensagem: "Erro ao deletar produto.", erro: error.message });
    }
  }
}

module.exports = new ProdutoController();
