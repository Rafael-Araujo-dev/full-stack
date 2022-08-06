require("dotenv").config();
const express = require("express");
const helmet  = require("./middlewares/helmet");

const _PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(helmet());
app.disable("x-powered-by");

app.use("/api", require("./routes/user"));

app.listen(_PORT, () => console.log(`Server is running on port ${_PORT}`));