const cors = require("cors");

// Configurações do cors
const corsOptions = {
    // Define as origens permitidas para requisições
    origin: [
        process.env.ALLOWED_ORIGIN,
        process.env.NODE_ENV !== "production" && "http://localhost:3000",
    ],
    optionsSucessStatus: 200, 
}

module.exports = { cors, corsOptions };