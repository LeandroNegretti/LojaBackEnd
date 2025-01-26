const ProdutoRepository = require('../repositories/ProdutoRepository');

class ProdutoService {
  // 1. Listar todos os produtos
  async listarTodosProdutos() {
    const produtos = await ProdutoRepository.listarTodosProdutos();
    return produtos;
  }

  // 2. Buscar um produto por ID
  async buscarProdutosPorId(id) {
    const produto = await ProdutoRepository.buscarProdutosPorId(id);

    if (!produto) {
      throw new Error('Produto não encontrado.');
    }

    return produto;
  }

  // 3. Criar um novo produto
  async criarProduto(dadosProduto) {
    if (!dadosProduto.nome || !dadosProduto.preco) {
      throw new Error('Os campos "nome" e "preço" são obrigatórios.');
    }

    const novoProduto = await ProdutoRepository.criarProduto(dadosProduto);
    return novoProduto;
  }

  // 4. Atualizar um produto existente
  async atualizarProduto(id, dadosAtualizados) {
    const produtoExistente = await ProdutoRepository.buscarProdutosPorId(id);

    if (!produtoExistente) {
      throw new Error('Produto não encontrado.');
    }

    const produtoAtualizado = await ProdutoRepository.atualizarProduto(id, dadosAtualizados);
    return produtoAtualizado;
  }

  // 5. Deletar um produto
  async deletarProduto(id) {
    const produtoExistente = await ProdutoRepository.buscarProdutosPorId(id);

    if (!produtoExistente) {
      throw new Error('Produto não encontrado.');
    }

    await ProdutoRepository.deletarProduto(id);
    return { mensagem: 'Produto deletado com sucesso.' };
  }
}

module.exports = new ProdutoService();