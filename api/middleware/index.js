const Action = require('../actions/actions-model');
const Project = require('../projects/projects-model');

const checkActionId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const action = await Action.get(id);
        if (!action) {
            res.status(404).json({ error: `Action with id ${id} not found` });
        } else {
            req.action = action;
            next();
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const checkProjectId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const project = await Project.get(id);
        if (!project) {
            res.status(404).json({ error: `Project with id ${id} not found` });
        } else {
            req.project = project;
            next();
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const validateAction = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ error: 'Missing body'});
    } else if (!req.body.description || !req.body.notes || !req.body.project_id) {
        res.status(400).json({ error: 'Missing content in the body' });
    } else {
        next();
    }
};

const validateProject = (req, res, next) => {
    console.log(req.body);
    if (!req.body) {
        res.status(400).json({ error: 'Missing body'});
    } else if (!req.body.description || !req.body.name || !req.body.completed) {
        res.status(400).json({ error: 'Missing content in the body' });
    } else {
        next();
    }
};

const serverError = (err, req, res, next) => {
    res.status(500).json({
        info: 'Something went wrong with the router',
        message: err.message,
        stack: err.stack
    });
};

module.exports = {
    checkActionId,
    validateAction,
    checkProjectId,
    validateProject,

    serverError
}