// Write your "projects" router here!
const express= require ("express");
const router= express.Router();
const projects= require("./projects-model")

router.get("/api/projects",((req,res)=>{
    projects.get(req.query.id)
    .then(project=>{res.status(200).json(project)})
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:"Could not retrieve projects."})
    })
}))
router.get("/api/projects/:id",((req,res)=>{
    if(!req.params.id){res.status(404).json({error:"The project with this id does not exist"})}
    projects.get(req.params.id)
    .then(project=>{res.status(200).json(project)})
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"server error occured"})
    })
}))

router.get("/api/projects/:id/actions",((req,res)=>{
    if(!req.params.id){res.status(404).json({error:"The project with this id does not exist"})}
    projects.getProjectActions(req.params.id)
    .then(project=>{res.status(200).json(project)})
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"server error occured"})
    })
}))

router.post("/api/projects",((req,res)=>{
    if(!req.body.name || !req.body.description){res.status(400).json({error:"Must include name and description"})}
    projects.insert(req.body)
    .then(project=>{
        res.status(201).json(project)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"server error occured"})
    })
}))

router.put("/api/projects/:id",((req,res)=>{
    if(!req.params.id){res.status(404).json({error:"The project with this id does not exist"})}
    if(!req.body.name || !req.body.description){res.status(400).json({error:"Must include name and description"})}
    projects.update(req.params.id,req.body)
    .then(project=>{
        res.status(200).json(project)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"server error occured"})
    })
}))

router.delete("/api/projects/:id",((req,res)=>{
    if(!req.params.id){res.status(404).json({error:"The project with this id does not exist"})}
    projects.remove(req.params.id)
    .then(()=>{
        res.status(200).json({message: "The action has been deleted."})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"server error occured"})
    })
}))

module.exports = router;
