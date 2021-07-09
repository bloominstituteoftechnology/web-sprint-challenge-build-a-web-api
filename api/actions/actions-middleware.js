// add middlewares here related to actions
const Action = require('../actions/actions-model');

const validatePost = (req, res, next) => {
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
      next({
        status: 400,
        message: "missing required field",
      })
    } else {
      next();
    }
};

const validateActionId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const action = await Action.get(id);
        console.log(action);
        if (action) {
            req.action = action;
            next();
        } else {
            next({
                status: 404,
                message: "action not found",
            })
        }
    } catch (err) {
        next(err);
    }
};

const validateAction = async (req, res, next) => {
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
        next({
            status: 400,
            message: "missing required field",
        })
    } else {
        next();
    }
}

module.exports = {
    validatePost,
    validateActionId,
    validateAction
};