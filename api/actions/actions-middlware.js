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


module.exports = {
  checkActionId
};
