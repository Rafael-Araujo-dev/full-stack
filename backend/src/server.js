require("dotenv").config(); // Habilita o uso de variáveis de ambiente
require("./config/db").connectDB(); // Tenta se conectar com o banco de dados
const express = require("express"); // Importa framework express
const chalk = require("chalk");

// Importação dos middlewares
const helmet  = require("./middlewares/helmet");
const cors = require("./middlewares/cors");
const errorHandler = require("./middlewares/errorHandler");
const morgan = require("./middlewares/morgan");

// Define a porta onde nossa aplicação rodará
const _PORT = process.env.PORT || 5000;

// Cria a apliação express
const app = express();

// Inicialização dos middlewares e configurações
app.use(helmet);
app.disable("x-powered-by");
app.use(cors);
app.use(morgan);

app.use(express.json()); // Define os dados recebidos das requisições sendo do tipo JSON Object
app.use(express.urlencoded({ extended: false}));

// Definição das rotas para a nossa aplicação
app.use("/api/users", require("./routes/userRoutes"));

// Define uma rota para verificações da API usando HealthCheck
app.use("/status", (req, res) => {
    res.status(200).json("active");
});

// Adiciona um manipulador de erro para nossa aplicação
app.use(errorHandler);

// Inicialização da aplicação
app.listen(_PORT, () => console.log(chalk.blue.bold(`Server is running on port ${_PORT}`)));