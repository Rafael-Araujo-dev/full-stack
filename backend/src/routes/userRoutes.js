const express = require("express");
const router = express.Router();

// Importa as funções do controlador
const { registerUser, loginUser } = require("../controllers/userController");

// Cria as rotas
router.post("/register", registerUser);
router.post("/login", loginUser);

// Exporta as rotas
module.exports = router;