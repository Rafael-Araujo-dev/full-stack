const cors = require("cors");

// Configurações do cors
const corsOptions = {
    // Define as origens permitidas para as requisições no servidor
    origin: process.env.ALLOWED_ORIGIN,
    optionsSucessStatus: 200, 
}

module.exports = cors(corsOptions);