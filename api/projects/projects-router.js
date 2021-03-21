const express= require('express');
const Projects = require('./projects-model.js');
const Actions = require('../actions/actions-model.js')
const router = express.Router();
const mw = require('../middleware/middleware.js')




router.get('/api/projects', (req,res) =>{
    Projects.find(req.query)
    .then(projects =>{
        res.status(200).json(projects)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({message:'***server error*** error retrieving the projects'})
    })
})

router.get('/api/projects/:id', mw.checkProjectsId, (req,res) =>{
    res.status(200).json(req.hub)
})

router.post('/api/projects', (req,res) =>{

})

router.delete('/api/projects/:id', mw.checkProjectsId, (req,res) =>{

})

router.put('/api/projects/:id', mw.checkProjectsId, (req,res) =>{

})

router.get('/api/projects/:id/actions', mw.checkProjectsId, (req,res) =>{

})

router.post('/api/projects/:id/actions', (req,res,next) =>{
    const actionInfo={...req.body, hub_id: req.params.id}

    Actions.add(actionInfo)
    .then(action =>{
        res.status(210).json(message)
    }).catch(err =>{
        next(err)
    })

})

router.use((err,req,res,next) => {
    res.status(500).json({
        message:"something blew up",
        error:err.message
})})
module.exports = router;
