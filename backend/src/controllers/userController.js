const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');

// Import the user Schema
const User = require('../models/userModel');

// @desc   Registra um novo usuário
// @route  POST /api/users
// @access public
// @params username*, email*, birthdate*, password*
const registerUser = asyncHandler(async (req, res) => {
    // Recebe os dados da requisição
    const {
        username, email, birthdate, password
    } = req.body;

    // Verifica se existe algum campo obrigatorio vazio
    if (!username || !email || !birthdate || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Verifica se o usuário já existe
    const usernameExists = await User.findOne({username});
    if (usernameExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Verifica se o email já está cadastrado
    const emailExists = await User.findOne({email});
    if (emailExists) {
        res.status(400);
        throw new Error("Email already registred");
    }

    // Criptografa a senha recebida
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria um novo usuário
    const user = await User.create({
        username: username,
        email: email,
        birthdate: birthdate,
        password: hashedPassword,
    });

    // Verifica se o usuário foi criado
    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            birthdate: user.birthdate,
            token: generateToken(user._id),
            message: "User registered successfully"
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
})

// Gera a um token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

module.exports = {
    registerUser
}