const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {

    const data = [
        {
            username: "rafael01",
            email: "rafael01@mail.com",
            name: "Rafael Araujo",
        }
    ];

    res.status(200).json(data);
    
});

module.exports = router;