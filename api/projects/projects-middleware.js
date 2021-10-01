const { get } = require('./projects-model');
const yup = require('yup');
const checkId = async (req, res, next) => {
    try {
        const id = req.params.id;

        const found = await get(id);

        if (!found) {
            next({ message: "sorry that that id doesn't exist'" })
        } else {
            req.found = found;
            next();
        }
    } catch (error) {
        next(error);
    }
};

const vaidatetion = yup.object().shape({
    name: yup.string().required().trim(),
    description: yup.string().required().trim(),

});

const validateProject = async (req, res, next) => {
    try {
        const validatebody = await vaidatetion.isValid(req.body);
        if (!validatebody) {
            res.status(400).json({ message: 'name and description are required' });
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};


const changeValid = yup.object().shape({
    name: yup.string().required().trim(),
    description: yup.string().required().trim(),
    completed: yup.boolean().required(),
});
const validateChange = async (req, res, next) => {
    try {
        const validatebody = await changeValid.isValid(req.body);
        if (!validatebody) {
            res.status(400).json({ message: 'name and description and completed are required' });
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkId,
    validateProject,
    validateChange,

};
