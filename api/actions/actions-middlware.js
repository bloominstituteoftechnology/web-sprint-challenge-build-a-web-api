// add middlewares here related to actions
const { get } = require('./actions-model');


const checkId = async (req, res, next) => {
    try {
        const id = req.params.id;

        const found = await get(id);

        if (!found) {
            res.status(404).json({ message: "sorry that that id doesn't exist'" });
        } else {
            console.log(found)
            req.found = found;
            next();
        }
    } catch (error) {
        next(error);
    }
};



module.exports = {
    checkId,

};