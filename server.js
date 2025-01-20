const express = requeri('express');
const sequelize = require('./src/config/database'); // Conexão com o banco de dados
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
const app = express();

//configuração de Middleware
app.use(express.json());
