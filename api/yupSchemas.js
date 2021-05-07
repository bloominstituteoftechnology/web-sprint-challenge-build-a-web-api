const yup = require("yup");

const projectsSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("missing required name field")
    .max(64, "name must be at most 64 chars"),

  description: yup
    .string()
    .trim()
    .required("missing required description field")
    .max(128, "description must be at most 280 chars"),

  completed: yup.bool(),
});

const actionsSchema = yup.object({
  project_id: yup.string().required("missing required project ID"),

  description: yup
    .string()
    .trim()
    .required("missing required project ID")
    .max(128, "description must be at most 280 chars"),
  notes: yup.string().trim().required("missing required notes"),

  completed: yup.bool(),
});

module.exports = { projectsSchema, actionsSchema };
