const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");
const moment = require("moment");

// Define nome do arquivo de log
const filename = `${moment.utc().format("YYYY-MM-DD")}.log`;
// Define o diretório do armazenamento do log
const dirname = "./access-log";

// Cria o arquivo de log
const accessLogStream = rfs.createStream(filename, {
    interval: "1d",
    path: dirname,
    compress: "gzip"
});

// Cria novos valores para log
morgan.token("forwarded", (req, res) => { return req.headers["x-forwarded-for"] || req.socket.remoteAddress || null }); // Registro da origem
morgan.token("moment", (req, res) => { return moment.utc().format() }); // Registro do momento atual da request/response

module.exports = morgan(':forwarded - :remote-user [:moment] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {
    stream: accessLogStream
});