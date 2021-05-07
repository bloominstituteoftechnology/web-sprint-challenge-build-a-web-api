const { projectsSchema, actionsSchema } = require("./yupSchemas");

const logger = (req, _res, next) => {
  console.log(`{
  request-type: ${req.method},
  endpoint: ${req.originalUrl},
  time-received: ${new Date().toISOString()}
}`);
  next();
};

const validateID = (dbModel, resName, req, next) => {
  const id = req.params.id;

  if (id) {
    dbModel
      .get(id)
      .then((result) => {
        if (result) {
          req.idResult = result;
          next();
        } else {
          next({
            status: 404,
            message: `${resName} with ID ${id} not found`,
          });
        }
      })
      .catch(next);
  } else {
    next();
  }
};

const validateBody = (schema, body, next) => {
  schema
    .validate(body, { stripUnknown: true })
    .then((validation) => {
      body = validation;
      next();
    })
    .catch((err) => next({ status: 400, message: err.message }));
};

const validateProject = (req, _res, next) => {
  validateBody(projectsSchema, req.body, next);
};
const validateAction = (req, _res, next) => {
  validateBody(actionsSchema, req.body, next);
};

// eslint-disable-next-line no-unused-vars
const handleErrors = (err, _req, res, _next) => {
  res.status(err.status || 500).json({
    note: "DEVS: There's trouble afoot, let's solve it!",
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  logger,
  validateID,
  validateProject,
  validateAction,
  handleErrors,
};
