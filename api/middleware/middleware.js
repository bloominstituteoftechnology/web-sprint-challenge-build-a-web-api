const Action = require("../actions/actions-model");

const validateActionId = async (req, res, next) => {
  try {
    const action = await Action.getById(req.params.id);
    if (!action) {
      res.status(404).json({ message: "action not found" });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateAction = (req, res, next) => {};

module.exports = {
  validateActionId,
  validateAction,
};
