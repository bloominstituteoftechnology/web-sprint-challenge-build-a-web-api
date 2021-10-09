// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();
console.log("projects running")

router.get('/', (req, res)=>{
    Projects.get()
    .then((projects)=>{
        if(!projects){
            res.status(404).json([])
        }else{
           res.status(200).json(projects) 
        }
        
    })
    .catch(()=>{
        res.status(500).json({message: 'Unable to get Projects'})
    })
})

router.get('/:id', (req, res)=>{
    const {id}= req.params
    console.log(id)
    Projects.get(id)
    .then((projects)=>{
        if(!projects){
            res.status(404).json([])
        }else{
           res.status(200).json(projects) 
        }
        
    })
    .catch(()=>{
        res.status(500).json({message: 'Unable to get Projects'})
    })
})



module.exports = router;

