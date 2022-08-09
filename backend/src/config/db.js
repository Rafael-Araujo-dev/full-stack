const mongoose = require("mongoose");

// Abre uma conexão com o banco de dados
const connectDB = async () => {
    console.log("Connecting to MongoDB...")
    try { // Tenta se conectar com o banco de dados
        const conn = await mongoose.connect(process.env.MONGO_URI); // Função do mongoose de conexão
        console.log(`MongoDB Connected to ${conn.connection.host}`); // Retorna as informações de conexão
    
    } catch (err) { // Se houver algum erro durante a tentativa de conexão com o banco de dados
        console.error(err);
        process.exit(1);
    }
}

// Exporta a função de conexão
module.exports = connectDB;