import Produto from "../models/Produto";

class ProdutoRepository {
  // Listar todos os produtos
  async listarTodosProdutos() {
    return await Produto.findAll();
  }

  // Buscar um produto por ID
  async buscarProdutosPorId(id) {
    return await Produto.findByPk(id);
  }

  // Cadastrar um novo produto
  async criarProduto(dataProduto) {
    return await Produto.create(dataProduto);
  }

  // Atualizar um produto
  async atualizarProduto(id, dadosAtualizados) {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      throw new Error("Produto não encontrado");
    }
    return await produto.update(dadosAtualizados);
  }

  // Deletar um produto
  async deletarProduto(id) {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      throw new Error("Produto não encontrado");
    }
    await produto.destroy();
    return { mensagem: "Produto deletado com sucesso" };
  }
}

module.exports = new ProdutoRepository();
