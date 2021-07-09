const logger = (req, res, next) => {
    const date = new Date();
    console.log(`
        REQUEST METHOD: ${req.method}
        REQUEST URL: ${req.originalUrl}
        TIMESTAMP: ${date.toLocaleString()}
        `);
    next();
};

const notFound = (req, res, next) => {
    res.status(404).json({
        message: 'not found, sorry!'
    })
}

const errorHandling = (err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        message: err.message,
    })
}

module.exports = {
    logger,
    notFound,
    errorHandling
};