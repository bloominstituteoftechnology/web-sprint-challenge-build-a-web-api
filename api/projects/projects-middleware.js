const Project = require("./projects-model")

async function checkProjectId(req, res, next) {
  try {
    const { id } = req.params;
    const validId = await Project.get(id)
    if (!validId) {
      res.status(404).json({
        message: "project not found"
      });
    } else {
      req.project = validId;
      next();
    };
  } catch (err) {
    res.status(500).json({
      message: "problem finding project"
    })
  };
};

function validProject(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({
      message: "Please provide name and description for the project"
    });
  } else {
    req.body
    next();
  };
};


module.exports = {
  checkProjectId,
  validProject
};
