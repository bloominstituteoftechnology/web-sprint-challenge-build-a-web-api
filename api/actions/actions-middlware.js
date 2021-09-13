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
  const { id } = req.params;
  try {
      const action = await Action.get(id);
      if (action) {
        req.action = action;
        next();
      } else {

        next({ status: 404, message: "action not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "problem finding action" });
    }
  }

  function validateAction(req, res, next) {
    const body = req.body;
    try {
      if (body && Object.keys(body).length === 0) {
        next({ message: "missing actions data. Please provide project_id, description and notes", status: 400 });
      } else if (!body.project_id) {
        next({ message: "missing project id", status: 400 });
      } else if (!body.description) {
        next({ message: "missing action description", status: 400 });
      } else if (!body.notes) {
        next({ message: "missing action notes", status: 400 });
      } else {
        next();
      }
    } catch (err) {
      next({ message: err.message, status: 500 });
    }
  }

module.exports = {
    validateAction,
    validateActionId,
    logger,
}