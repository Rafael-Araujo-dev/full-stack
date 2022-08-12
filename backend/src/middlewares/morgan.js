const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");

const date = new Date;

// Define nome do arquivo de log
const filename = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}.log`;
// Define o diretório do armazenamento do log
const dirname = "./access-log";

// Cria o arquivo de log
const accessLogStream = rfs.createStream(filename, {
    interval: "1d",
    path: dirname,
    compress: "gzip"
});

module.exports = morgan("combined", {
    stream: accessLogStream
});