const Action = require('./actions-model');
const Post = require('../projects/projects-model');
const yup = require('yup');

const checkId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const found = await Action.get(id);
        if (!found) {
            next({ message: `sorry that that id ${id} doesn't exist` });
        } else {
            req.found = found;
            next();
        }
    } catch (error) {
        next(error);
    }
};

const vaidatetion = yup.object().shape({
    notes: yup.string().required(),
    description: yup.string().required(),
    project_id: yup.number().required(),
});

const validateAction = async (req, res, next) => {
    const id = req.body.project_id;
    const findPost = await Post.get(id);
    const validatebody = await vaidatetion.isValid(req.body);
    try {
        if (!findPost)
            next({ message: `Sorry we coundt find a project with that id of ${id}` });
        if (!validatebody) {
            res
                .status(400)
                .json({ message: 'action is missing id or note or description' });
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkId,
    validateAction,
};
