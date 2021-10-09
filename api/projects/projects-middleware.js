// add middlewares here related to projects
const Projects = require("./projects-model")

function validateProjectId(req,res, next){
    const {id}= req.params;

    Projects.get(id)
    .then((projects) => {
      if (!projects) {
        res.status(404).json([]);
      } else {
        req.projects = projects;
        next();
      }
    })
}

function validateRequestBody(req, res, next){
    const {name, description} = req.body
    if(!name || !description || Object.keys(req.body).length === 0){
        res.status(400).json({message: "missing name, description or completed field."})
      }else{
        next()
      }
}

module.exports = {
    validateProjectId,
    validateRequestBody
}