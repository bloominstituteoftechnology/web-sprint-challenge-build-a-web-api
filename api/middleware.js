const logger = (req, res, next) => {
  console.log(`{
  request-type: ${req.method},
  endpoint: ${req.originalUrl},
  time-received: ${new Date().toISOString()}
}
  `);
  next();
};

const validateID = (req, res, next) => {
  next();
};

const validateBody = (req, res, next) => {
  next();
};

const handleErrors = (error, req, res, next) => {
  next();
};

module.exports = { logger, validateID, validateBody, handleErrors };
