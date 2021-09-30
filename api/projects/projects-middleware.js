const yup = require('yup');
const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
    try{
        const validatedId = await Projects.get(req.params.id);

        if(!validatedId){
            next({ status: 404, message:'project not found'});
        } else {
            req.user = validatedId;
            next();
        }
    
    }
    catch(err){
        next(err);
    }
};


module.exports = {
    validateProjectId
}