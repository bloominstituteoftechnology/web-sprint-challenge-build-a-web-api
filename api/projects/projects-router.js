// Write your "projects" router here!
const express= require ("express");

const router= express.Router();

const projects= require("./projects-model")

router.get("/api/projects",((req,res)=>{
    projects.get(req.query.id)
    .then(project=>{res.status(200).json(project)})
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:"Projects not found."})
    })
}))
router.get("/api/projects/:id",((req,res)=>{
    if(!req.params.id){res.status(404).json({error:"No such Id Project"})}
    projects.get(req.params.id)
    .then(project=>{res.status(200).json(project)})
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"Server error"})
    })
}))

router.get("/api/projects/:id/actions",((req,res)=>{
    if(!req.params.id){res.status(404).json({error:"Could not find project with this ID."})}
    projects.getProjectActions(req.params.id)
    .then(project=>{res.status(200).json(project)})
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"server error occured"})
    })
}))

router.post("/api/projects",((req,res)=>{
    if(!req.body.name || !req.body.description){res.status(400).json({error:"description required"})}
    projects.insert(req.body)
    .then(project=>{
        res.status(201).json(project)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"Server error"})
    })
}))

router.put("/api/projects/:id",((req,res)=>{
    if(!req.params.id){res.status(404).json({error:"Project with this ID not found"})}
    if(!req.body.name || !req.body.description){res.status(400).json({error:"Name and description required"})}
    projects.update(req.params.id,req.body)
    .then(project=>{
        res.status(200).json(project)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"Server Error"})
    })
}))

router.delete("/api/projects/:id",((req,res)=>{
    if(!req.params.id){res.status(404).json({error:"Project with this ID not found"})}
    projects.remove(req.params.id)
    .then(()=>{
        res.status(200).json({message: "Success: Deleted"})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"Server Error"})
    })
}))

module.exports = router; 