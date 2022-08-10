// Import the user Schema
const User = require('../models/userModel');

// @desc   Registra um novo usuário
// @route  POST /api/users
// @access public
// @params 
const registerUser = async (req, res) => {
    res.send(req.body);
}

module.exports = {
    registerUser
}