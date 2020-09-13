const express = require("express");
const projectModel = require ("../helpers/projectModel");
const router = express.Router();

router.post("/", (req,res)=> {
    const projectInfo = req.body;
    projectModel
    .insert(projectInfo)
    .then(()=>{
        res.status(201).json({message: "Your project was created"})
    })
})
router.get("/", (req, res) =>{
    projectModel
    .get(req.id)
    .then(e =>{
        res.status(200).json(e)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Error retrieving project"})
    })
})

router.put("/:id", (req, res) => {
    const projectInfo = req.body;
    const {id} = req.params
    projectModel
    .update(id, projectInfo)
    .then(e =>{
        if(e){
            res.status(200).json({messge:"Project was updated"})
        }else{
            res.status(404).json({message:"Project could not be updated"})
        }
    })
    .catch(err => {
        res.status(500).json({message:"There was an error updating the project"})
    })
})

router.delete("/:id", (req, res) => {
    projectModel
    .remove(req.params.id)
    .then(e => {
        if(e){
            res.status(200).json({message:"Project was deleted"})
        }else {
            res.status(404).json({message:"Project could not be deleted"})
        }
    })
    .catch(err =>{
        res.status(500).json({message:"Error deleting project"})
    })
})

router.get("/:id/project_actions", (req, res)=>{
    projectModel
    .getProjectActions(req.params.id)
    .then(e =>{
        res.status(200).json(e)
    })
    .catch(err =>{
        res.status(500).json({message: "Error retrieving project actions"})
    })
})
module.exports = router;