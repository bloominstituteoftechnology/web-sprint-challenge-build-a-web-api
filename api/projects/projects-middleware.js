
// add middlewares here related to projects

// [ ] Write at least two middleware functions for this API, and consume them in the proper places of your code.

const Project = require("./projects-model");
function vaildationProject(req, res, next) {
    const { name, description } = req.body
    if(!name || !description){
        next({
            message: "Provide name and descripton credintals in the queue",
            status: 400
        })
    }
    else{
       req.name = name.trim()
        
    }

}


function validateID(req, res, next){
    Project.get(req.params.id || req.body.project_id)
    .then(projects => {
    if(projects){
        res.status(404).json({
            message:" no project by this id"
        })
    }
        else{ 
            req.action = action 
            next()
        }
    })
    .catch(next)
}    


module.exports = {
    vaildationProject,
    validateID
};
