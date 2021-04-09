const Action = require('../actions/actions-model');
const Project = require('../projects/projects-model');

const logged = (req, res, next) => {
    console.log(
        `Method: ${req.method},
        URL: ${req.url},
        Timestamp: ${new Date()}`
    );
    next();
}

const validateActionId = async (req, res, next) => {
    const { id } = req.params
    try {
        const act = await Action.get(id)
        if(!act) {
            console.log(`action with id: ${id} not found`);
            res.status(404).json({
                message: `action with id: ${id} not found`
            });
        }else {
            console.log(act);
            req.act = act
            next();
        }
    }catch(error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

const validateProjectId = async (req, res, next) => {
    const { id } = req.params
    try {
        const proj = await Project.get(id)
        if(!proj) {
            console.log(`project with id: ${id} not found`);
            res.status(404).json({
                message: `project with id: ${id} not found`
            });
        }else {
            console.log(proj);
            req.proj = proj
            next();
        }
    }catch(error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

const validateAction = (req, res, next) => {
    const newAction = req.body
    if(!newAction) {
        console.log('missing data');
        res.status(400).json({
            message: 'missing data'
        });
    }else {
        console.log(newAction);
        next();
    }
}

const validateProject = (req, res, next) => {
    const newProject = req.body
    if(!newProject) {
        console.log('missing data');
        res.status(400).json({
            message: 'missing data'
        });       
    }else {
        console.log(newProject);
        next();
    }
}

module.exports = {
    logged,
    validateActionId,
    validateProjectId,
    validateAction,
    validateProject,
}
