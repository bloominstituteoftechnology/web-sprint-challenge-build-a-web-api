// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId (req, res, next){
    try{
        const project = await Projects.get(req.params.id)
        if(!project){
            res.status(404).json({message: 'No project can be found with that ID'})
        }else{
            req.project = project
            next()
        }
    }catch(err){
        res.status(500).json({message: 'Having trouble accessing the database'})
    }
}

module.exports = {validateProjectId}