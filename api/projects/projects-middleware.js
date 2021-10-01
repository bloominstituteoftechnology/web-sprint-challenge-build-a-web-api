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
  } catch (error) {
    next(error)
  }
}


module.exports = {
  checkProjectId,
};
