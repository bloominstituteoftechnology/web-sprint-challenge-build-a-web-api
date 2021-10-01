const { get } = require('./projects-model');
const yup = require('yup');
// add middlewares here related to projects
const checkId = async (req, res, next) => {
    try {
        const id = req.params.id;

        const found = await get(id);

        if (!found) {
            res.status(404).json({ message: "sorry that that id doesn't exist'" });
        } else {
            req.body = found;
            next();
        }
    } catch (error) {
        next(error);
    }
};

const vaidatetion = yup.object().shape({
    name: yup.string().required().trim(),
    description: yup.string().required().trim()
})

const validateProject = async (req, res, next) => {
    const { name, description } = req.body
    try {
        const validatebody = await vaidatetion.isValid(req.body)
        if (!validatebody) {
            res.status(400).json({ message: "name and description are required" });
        } else {
            req.body = { name: name.trim(), description: description.trim() };
            next();
        }


    } catch (error) {
        next(error);
    }
}


module.exports = {
    checkId,
    validateProject,
};
