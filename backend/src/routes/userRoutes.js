const express = require("express");
const router = express.Router();

// Importa as funções do controlador
const { registerUser } = require("../controllers/userController");

// Cria as rotas
router.post("/register", registerUser);

// Exporta as rotas
module.exports = router;