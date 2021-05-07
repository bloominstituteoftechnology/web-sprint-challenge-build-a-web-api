const Projects = require("./projects/projects-model");
const Actions = require("./actions/actions-model");
const { projectsSchema, actionsSchema } = require("./yupSchemas");

const logger = (req, res, next) => {
  console.log(`{
  request-type: ${req.method},
  endpoint: ${req.originalUrl},
  time-received: ${new Date().toISOString()}
}
  `);
  next();
};

const validateID = (req, _res, next) => {
  const url = req.originalUrl;
  const id = req.params.id;
  url.startsWith("/api/projects")
    ? Projects.get(id)
        .then((result) => {
          result
            ? (req.idResult = result)
            : next({ status: 404, message: "PARSE THIS" });
        }) //!extrapolate this string
        .catch(next())
    : url.startsWith("/api/actions")
    ? Actions.get(id)
        .then((result) => {
          result
            ? (req.idResult = result)
            : next({ status: 404, message: "PARSE THIS" });
        }) //!extrapolate this string
        .catch(next())
    : next();
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

const validateProject = (req, res, next) => {
  validateBody(projectsSchema, req.body, next);
};
const validateAction = (req, res, next) => {
  validateBody(actionsSchema, req.body, next);
};

const handleErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({
    note: "DEVS: There's trouble afoot, let's solve it!",
    message: err.message,
    stack: err.stack,
  });
  next();
};

module.exports = {
  logger,
  validateID,
  validateProject,
  validateAction,
  handleErrors,
};
