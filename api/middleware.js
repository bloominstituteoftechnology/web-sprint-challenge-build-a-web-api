const logger = (req, res, next) => {
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
