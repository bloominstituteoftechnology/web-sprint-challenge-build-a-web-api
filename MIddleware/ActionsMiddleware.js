const dbActions = require('../data/helpers/actionModel');

function validateActionId(req, res, next) {
  if (!req.body.id) {
    dbActions.get(req.params.id).then((action) => {
      if (!action) {
        return res.status(400).json({ message: 'please enter a valid id' });
      }
      next();
    });
  } else {
    dbActions.get(req.body.id).then((action) => {
      if (!action) {
        return res.status(400).json({ message: 'please enter a valid id' });
      }
      next();
    });
  }
}

module.exports = validateActionId;