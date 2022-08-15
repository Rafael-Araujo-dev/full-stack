const mongoose = require("mongoose");
const chalk = require("chalk");

// Abre uma conexão com o banco de dados
module.exports.connectDB = async () => {
    console.log(chalk.yellow.bold("Connecting to MongoDB..."));
    try { // Tenta se conectar com o banco de dados
        const conn = await mongoose.connect(process.env.MONGO_URI); // Função do mongoose de conexão
        console.log(chalk.green.bold(`MongoDB Connected to ${conn.connection.host}`)); // Retorna as informações de conexão
    
    } catch (err) { // Se houver algum erro durante a tentativa de conexão com o banco de dados
        console.log(chalk.red.bold("Unable to establish a connection to MongoDB"));
        console.error(err);
        process.exit(1);
    }
}