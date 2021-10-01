const yup = require("yup");
const Projects = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const validatedId = await Projects.get(req.params.id);

    if (!validatedId) {
      next({ status: 404, message: "project not found" });
    } else {
      req.user = validatedId;
      next();
    }
  } catch (err) {
    next(err);
  }
}

const projectValidationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("project name is required")
    .min(1, "min 1 char"),
  description: yup
    .string()
    .trim()
    .required("project name is required")
    .min(1, "min 1 char"),
  completed: yup
    .boolean()
    .required("Project must be marked completed or uncompleted"),
});

async function validateProject(req, res, next) {
  try {
    const validated = await projectValidationSchema.validate(req.body);

    req.body = validated;
    next();
  } catch (err) {
    next({ status: 400, message: "missing required text field" });
  }
}

module.exports = {
  validateProjectId,
  validateProject,
};