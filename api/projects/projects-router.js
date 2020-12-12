const express =  require('express');

const projects = require('./projects-model');

const router = express.Router();
router.get("/projects", async (req, res) => {
    try{
        const getProjects = await projects.get();
        res.json(getProjects);
    }catch (err){
next(err)
    }
    
});
router.get("/projects/:id", validateID(), (req, res) => {
    res.status(200).json(req.project)
});
router.post("/projects", validateProject(), async (req, res) => {
try{
    const newProject = await projects.insert({
        name: req.body.name,
        description: req.body.description
    });
    res.status(201).json(newProject)
}catch(err){
    next(err)
}
});
router.put("/projects/:id",validateProject(), validateID(), async(req, res) => {
    try{
        const updatedProject = await projects.update(req.params.id, req.body)
        res.status(200).json(updatedProject)
    }catch(err){
        next(err)
    }
})
router.delete("/projects/:id", validateID(), async (req, res) => {
try{
const deleteProject = await projects.remove(req.params.id)
res.status(204).json({
    message: "project was deleted"
})
}catch(err){
    next(err)
}
});
router.get("/projects/:id/actions", validateID(), async (req, res) => {
try{
    const getProjectsActions = await projects.getProjectActions(req.params.id);
    res.status(200).json(getProjectsActions);
}catch(err){
    next(err)
}
})

//custom middleware
function validateID()  {
return (req, res, next) => {
    projects.get(req.params.id)
    .then(project => {
        if(project){
            req.project = project
            next()
        }else{
            res.status(404).json({
                message: "user with the id provided does not exist"
            })
        }
    })
    .catch(err => {
        next(err)
    })
};

};

function validateProject(){
    return (req, res, next) => {
        if(!req.body.name || !req.body.description){
            res.status(400).json({
                message: "missing project name or description. please provide all the project data necesarry"
            })
        }else{
            next()
        }
    }
}
module.exports = router;