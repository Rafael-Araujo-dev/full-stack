const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');

// Importa o Schema da collection User
const User = require('../models/userModel');

// @desc   Registra um novo usuário
// @route  POST /api/users/register
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
    const usernameExists = await User.findOne({username: username});
    if (usernameExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Verifica se o email já está cadastrado
    const emailExists = await User.findOne({email: email});
    if (emailExists) {
        res.status(400);
        throw new Error("Email already registred");
    }

    // Criptografa a senha recebida
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria um novo usuário
    const user = await User.create({
        status: true,
        username: username,
        email: email,
        birthdate: birthdate,
        password: hashedPassword,
    });

    // Verifica se o usuário foi criado
    if (user) {
        // Armazena o token para o usuário
        user.token = generateToken(user._id, user.email);

        // Retorna novo usuário
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            birthdate: user.birthdate,
            token: user.token,
            message: "User registered successfully"
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc   Realiza o login
// @route  POST /api/users/login
// @access public
// @params username or email*, password*
const loginUser = asyncHandler(async (req, res) => {
    // Recebe os dados da requisição
    const {
        username, password
    } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!username || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Verifica se o usuário ou email informado está cadastrado
    const usernameExists = await User.findOne({username: username});
    const emailExists = await User.findOne({email: username});
    const user = usernameExists || emailExists;

    // Caso não for encontrado nenhum usuário cadastrado, é retornado uma mensagem de erro
    if (!user) {
        res.status(400);
        throw new Error("Invalid username and/or password, please verify they are correct and try again.");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        // Gera um token para o usuário
        user.token = generateToken(user._id, user.email);

        // Retorna usuário
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: user.token,
            message: "User logged in successfully, please wait while being redirected"
        });
    } else {
        res.status(400);
        throw new Error("Invalid username and/or password, please verify they are correct and try again.");
    }

});

// Gera a um token JWT
const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

module.exports = {
    registerUser, loginUser
}