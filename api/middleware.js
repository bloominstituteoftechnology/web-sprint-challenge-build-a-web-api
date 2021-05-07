const Projects = require("./projects/projects-model");
const Actions = require("./actions/actions-model");

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
  next();
};

const handleErrors = (error, req, res, next) => {
  next();
};

module.exports = { logger, validateID, validateBody, handleErrors };
