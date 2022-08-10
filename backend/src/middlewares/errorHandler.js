const errorHandler = (err, req, res, next) => {
    // Armazena o código de status da response da nossa aplicação, se não houver será definido o código 500 como padrão
    const statusCode = res.statusCode ? res.statusCode : 500; 

    res.status(statusCode); // Define o código de status

    res.json({
        message: err.message, // Exibe a mensagem de erro
        stack: process.env.NODE_ENV === "production" ? null : err.stack // Exibe todo o log de erro, caso a aplicação não estiver em ambiente de produção
    })
}

// Exporta a função errorHandler
module.exports = errorHandler;