require('dotenv').config(); 

const PORT = process.env.PORT || 4000;

function logger(req, res, next) {
    console.log(`
    URL: http://localhost:${PORT}${req.originalUrl}
    ${new Date().toISOString()}: ${req.method} to ${req.url}`)
    next()
  };
module.exports = logger