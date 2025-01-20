const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'usuarios',  // Especifica o nome da tabela como 'usuarios' (em minúsculas)
    timestamps: true, // Garante que as colunas 'createdAt' e 'updatedAt' sejam gerenciadas automaticamente
});

module.exports = Usuario;