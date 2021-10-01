const Action = require("./actions-model")

async function checkActionId(req, res, next) {
  try {
    const { id } = req.params;
    const validId = await Action.get(id)
    if (!validId) {
      res.status(404).json({
        message: "project not found"
      });
    } else {
      req.action = validId;
      next();
    };
  } catch (err) {
    res.status(500).json({
      message: "problem finding project"
    })
  };
};

function validAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({
      message: "Please provide name and description for the project"
    });
  } else {
    req.body
    next();
  };
};



module.exports = {
  checkActionId,
  validAction
};
