const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

router.get("/users", asyncHandler( async (req, res) => {
    const user = await User.find();
    
    if (user) res.status(202).json(user);
    else res.status(404).json({ message: "User not found" });
}));

router.get("/user", asyncHandler( async (req, res) => {
    const { id } = req.body;

    const user = await User.findById(id).select("-password");
    
    if (user) res.status(202).json(user);
    else res.status(404).json({ message: "User not found" });
}));

router.delete("/user", asyncHandler( async (req, res) => {
    const { id } = req.body;

    const remove = await User.findByIdAndRemove(id);

    if (remove) res.status(202).json({ message: "User removed successfully" });
    else res.status(404).json({ message: "User not found" });
}));

router.patch("/user", asyncHandler( async (req, res) => {
    const { id, email } = req.body;
    
    if (!id || !email) throw new Error ("Please add all fields");

    const user = await User.findByIdAndUpdate(id, { email: email });

    if (user) res.status(202).json({ message: "User updated successfully" });
    else res.status(404).json({ message: "User not found" });
}));

router.post("/user", asyncHandler( async (req, res) => {
    const {
        username, email, birthdate, password
    } = req.body;

    if (!username, !email, !birthdate, !password) throw new Error ("Please add all fields")
    else {
        const usernameExists = await User.findOne({ username: username });
        const emailExists = await User.findOne({ email: email });

        if (usernameExists) throw new Error ("Username already registred, please try another username");
        if (emailExists) throw new Error ("Email already registred, please try another email");

        if (!usernameExists || !emailExists) {

            const bcrypt = require("bcryptjs");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await User.create({
                username: username,
                email: email,
                birthdate: birthdate,
                password: password
            });

            if (user) res.status(200).json("User created successfully");
            else throw new Error ("Couldn't create user");
        }
    }
}));

module.exports = router;