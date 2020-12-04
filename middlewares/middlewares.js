const Projects = require('../api/projects/projects-model')
const Actions = require('../api/actions/actions-model')

const validateProjectId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await Projects.get(id);
        if (!project) {
            res.status(404).json({ message: `User with ID ${id} not found` })
        } else {
            req.project = project
            next();
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the project'})
    }
};

const validateProject = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: 'Missing project data' })
    } else if
        (!req.body.name || !req.body.description) {
            res.status(400).json({ message: 'Missing required name and description field' })
        } else {
            next();
        }
};

const validateAction = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: 'Missing action data' })
    } else if
        (!req.body.project_id || !req.body.description || !req.body.notes) {
            res.status(400).json({ message: 'Missing required project id, description and notes' })
        } else {
            next();
        }
};

const validateActionId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const action = await Actions.get(id);
        if (!action) {
            res.status(404).json({ message: `Action with ID ${id} not found` })
        } else {
            req.action = action;
            next()
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the action', error: error.errorMessage })
    }
}

module.exports = {
    validateProjectId,
    validateProject,
    validateActionId,
    validateAction
}
