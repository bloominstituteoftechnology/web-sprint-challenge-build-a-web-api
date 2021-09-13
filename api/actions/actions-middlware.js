// add middlewares here related to actions
const Action = require('../actions/actions-model');

function logger(req, res, next) {
    const timeStamp = new Date().toLocalString();
    const method = req.method;
    const url = req.originalUrl;
    console.log(`[${timestamp}] ${method} to ${url}`);
    next();
}

async function validateActionId(req, res, next) {
    try {
      const action = await Action.get(req.params.id);
      if (!action) {
        next({ status: 404, message: "action not found" });
      } else {
        req.action = action;
        next();
      }
    } catch (err) {
      res.status(500).json({ message: "problem finding action" });
    }
  }

  function validateAction(req, res, next) {
    Action.insert(req.body)
        .then(action => {
            if (!req.body.name || !req.body.description) {
                res.status(400).json({
                  message: 'missing required name and description field'
                });
              } else {
                  res.status(201).json(action);
              }
        })
        .catch(next);
  }

module.exports = {
    validateAction,
    validateActionId,
    logger,
}