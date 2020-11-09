const express = require('express');
const router = express.Router();
const Project = require('./data/helpers/projectModel');


//GET PROJECTS 

router.get('/:id', (req,res)=>{
    Project
        .get(req.params.id)
        .then(projects=>{
            if(projects){
            res.status(200).json(projects);
        }else{
            res.status(404).json({
                message: 'Project not found with that id'
            })
        }
        })
        .catch(error=>{
            console.log(error, 'get all projects catch error');
            res.statusCode(500).json({
                message:'error with getting projects'
            })
        })
})

//POST PROJECTS

router.post('/', (req,res)=>{
    Project
        .insert(req.body)
        .then(project=>{
            res.status(200).json(project);
        })
        .catch(error=>{
            console.log(error,'error with project post request');
            res.status(500).json({
                message: 'error with posting to db'
            })
        })
})

//PUT PROJECTS

router.put('/:id',(req,res)=>{
    Project
        .update(req.params.id, req.body)
        .then(project=>{
            if(project){
                res.status(200).json(project);
            }else{
                res.status(400).json({
                    message: 'Project does not exist'
                })
            }
        })
        .catch(error=>{
            console.log(error,"put request project error");
            res.status(500).json({
                message:"error with db"
            })
        })
})

//DELETE PROJECTS

router.delete('/:id',(req,res)=>{
    const id = req.params.id
    Project
        .remove(id)
        .then(project=>{
            res.status(200).json({
                message: 'project deleted'
            })
        })
        .catch(error=>{
            console.log(error,"error with delete project request");
            res.status(500).json({
                message:"error deleting from db"
            })
        })
})

router.get('/:id/actions',(req,res)=>{
    Project
    .getProjectActions(req.params.id, req.body)
    .then(actions=>{
       
        res.status(200).json(actions);

    })
    .catch(error=>{
        console.log(error, 'get all project actions catch error');
        res.statusCode(500).json({
            message:'error with getting project actions'
        })
    })
})


module.exports = router;
