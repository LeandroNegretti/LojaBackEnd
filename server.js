const express = require("express");
const sequelize = require("./src/config/database"); // Conexão com o banco de dados
const dotenv = require("dotenv");
const cors = require("cors");

// Carregar variáveis de ambiente
dotenv.config();
const app = express();

// Configurar CORS para permitir qualquer origem (desenvolvimento)
app.use(
  cors({
    origin: "*", // Permite qualquer origem
    methods: ["GET", "POST", "PUT", "DELETE"], // Permite esses métodos HTTP
    allowedHeaders: ["Content-Type", "Authorization"], // Permite esses cabeçalhos
  })
);

//configuração de Middleware
app.use(express.json());

const usuarioRoutes = require("./src/routes/UsuarioRoutes");

app.use("/api/", usuarioRoutes);

// Função para conectar ao banco de dados
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados bem-sucedida!");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
    process.exit(1); // Encerra o servidor caso falhe a conexão com o banco
  }
};

connectDB();

// Alterar as tabelas sem apagar os dados
sequelize
  .sync({ alter: true }) // Alteração segura (não apaga dados)
  .then(() => {
    console.log("Banco de dados sincronizado!");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });

const PORT = 3000; // Definindo a porta diretamente no código
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
