require("dotenv").config(); // Habilita o uso de variáveis de ambiente
const express = require("express"); // Importa framework express
const connectDB = require("./config/db"); // Importa função de conexão com o banco de dados
const chalk = require("chalk");

// Importação dos middlewares
const helmet  = require("./middlewares/helmet");
const cors = require("./middlewares/cors");
const errorHandler = require("./middlewares/errorHandler");
const morgan = require("./middlewares/morgan");

// Define a porta onde nossa aplicação rodará
const _PORT = process.env.PORT || 5000;

connectDB(); // Tenta se conectar com o banco de dados

const app = express(); // Cria a apliação express

// Inicialização dos middlewares e configurações
app.use(helmet);
app.disable("x-powered-by");
app.use(cors);
app.use(morgan);


app.use(express.json()); // Define os dados recebidos das requisições sendo do tipo JSON Object
app.use(express.urlencoded({ extended: false}));

// Definição das rotas para a nossa aplicação
app.use("/api/users", require("./routes/userRoutes"));

app.use("/test", (req, res) => {
    res.status(200).json("successfully");
})

// Adiciona um manipulador de erro para nossa aplicação
app.use(errorHandler);

// Inicialização da aplicação
app.listen(_PORT, () => console.log(chalk.blue.bold(`Server is running on port ${_PORT}`)));