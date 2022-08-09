require("dotenv").config(); // Habilita o uso de variáveis de ambiente
const express = require("express"); // Importa framework express
const connectDB = require("./config/db"); // Importa função de conexão com o banco de dados

// Importação dos middlewares
const helmet  = require("./middlewares/helmet");

// Define a porta onde nossa aplicação rodará
const _PORT = process.env.PORT || 5000;

connectDB(); // Tenta se conectar com o banco de dados

const app = express(); // Cria a apliação express

// Inicialização dos middlewares e configurações
app.use(helmet());
app.disable("x-powered-by");

// Definição das rotas para a nossa aplicação
app.use("/api", require("./routes/user"));

// Inicialização da aplicação
app.listen(_PORT, () => console.log(`Server is running on port ${_PORT}`));