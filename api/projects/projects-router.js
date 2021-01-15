// Write your "projects" router here!

const express=require('express');

const Projects=require('./projects-model')

const {validateProjectId,validateProjectBody}=require('../middleware/middleware');




const router=express.Router();

router.get('/', (req,res,next)=>{
    Projects.get()
        .then(projects=>{
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get('/:id',validateProjectId, (req,res,next)=>{
    res.status(200).json(req.project)
})

router.post('/',validateProjectBody,(req,res,next)=>{
    Projects.insert(req.body)
        .then(project=>{
            res.status(200).json(project)
        })
        .catch(next)
})

router.put('/:id',validateProjectId, validateProjectBody, (req,res,next)=>{
    Projects.update(req.params.id,req.body)
        .then(project=>{
            res.status(200).json(project)
        })
        .catch(next)
})



router.delete('/:id',validateProjectId, (req,res,next)=>{
    Projects.remove(req.params.id)
        .then(deleted=>{
            if (deleted===1){
                res.status(200).json({message:`The project with the id of ${req.params.id} was deleted`})
            }
            else{res.status(500).json({message:'There was an error deleting the project'})}
        })
        .catch(next)
})

router.get('/:id/actions',validateProjectId,(req,res,next)=>{
    Projects.getProjectActions(req.params.id)
        .then(actionsArray=>{
            res.status(200).json(actionsArray)
        })
        .catch(next)
})






router.use((error, req, res, next)=>{
    res.status(500).json({ info: 'There was an error in the router',
  message: error.message,
  stack: error.stack})
  })

  module.exports=router