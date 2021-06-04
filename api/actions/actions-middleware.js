const Actions = require('./actions-model');
const yup = require('yup');

function logger(req, res, next) {
    console.log(`
        ${req.method} request to ${req.baseUrl} endpoint
    `);
    next();
}

async function validateActionId(req, res, next) {
    const action = await Actions.get(req.params.id);
    if (!action) {
        res.status(404).json({
            message: "no action found",
        });
    } else {
        req.action = action;
        next();
    }
}

const actionSchema = yup.object({
    project_id: yup.number().required(),
    description: yup.string().trim().max(128).required(),
    notes: yup.string().trim().required(),
    completed: yup.bool(),
});

async function validateAction(req, res, next) {
    try {
        const validatedAction = await actionSchema.validate(req.body, {
            stripUnknown: true,
        });
        req.body = validatedAction;
        next();
    } catch (err) {
        res.status(400).json({
            message: "project id, description, and notes fields required"
        });
    }
}

module.exports = { logger, validateActionId, validateAction };