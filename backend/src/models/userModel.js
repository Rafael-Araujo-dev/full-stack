const mongoose = require("mongoose");

// Defina um Schema para collection user
const userSchema = mongoose.Schema(
    {
        username: {
            type: String, // Define o tipo do valor
            required: [true, "Please add a username"], // Define o valor como obrigatório e envia uma mensagem caso estiver vazio 
            unique: true, // Define que o valor é único
        },
        name: {
            type: String, // Define o tipo do valor
        },
        email: {
            type: String, // Define o tipo do valor
            required: [true, "Please add a email address"], // Define o valor como obrigatório e envia uma mensagem caso estiver vazio
            unique: true,
        },
        password: {
            type: String, // Define o tipo do valor
            required: [true, "Please add a password"], // Define o valor como obrigatório e envia uma mensagem caso estiver vazio
        },
        birthdate: {
            type: Date, // Define o tipo do valor
            required: [true, "Please add a birthdate"],
        },
        avatar: {
            type: String, // Define o tipo do valor
        },
        area: {
            type: Number, // Define o tipo do valor
        },
        location: {
            type: Number, // Define o tipo do valor
        },
        bio: {
            type: String, // Define o tipo do valor
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);