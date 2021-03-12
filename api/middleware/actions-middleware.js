const Action = require("../actions/actions-model");

const validateActionId = async (req, res, next) => {
  try {
    const action = await Action.get(req.params.id);
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

const validateAction = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "missing action data" });
  } else if (!req.body.description || !req.body.description.trim()) {
    res.status(400).json({ message: "missing required description field" });
  } else if (!req.body.notes || !req.body.notes.trim()) {
    res.status(400).json({ message: "missing required notes field" });
  } else if (!req.body.project_id) {
    res.status(400).json({ message: "missing required project_id field" });
  } else {
    next();
  }
};

module.exports = {
  validateActionId,
  validateAction,
};
