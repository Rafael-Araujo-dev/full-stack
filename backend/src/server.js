require("dotenv").config();
const express = require("express");

const _PORT = process.env.PORT || 5000;

const app = express();

app.listen(_PORT, () => console.log(`Server is running on port ${_PORT}`));