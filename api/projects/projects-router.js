// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()
const {validateProjectId} = require('./projects-middleware')

router.get('/', async (req, res) => {
    try{
        const projects = await Projects.get()
        res.status(200).json(projects)
    }catch(err){
        res.status(500).json({message: 'There was an issue accessing the server'})
    }
})

router.get('/:id', validateProjectId, (req, res) => {
    try{
        const id = req.params.id
        const projectFormId = await Projects.get()
        res.status(200).json(projectFormId)
    }catch(err){
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try{
        const id = req.params.id
        const projectActions = await Projects.getProjectActions(id)
        res.status(200).json(projectActions)
    }catch(err){
        next(err)
    }
})

router.post('/', async (req, res) => {
    try{
        const {name, description} = req.body
        if(!name || !description){
            res.status(400).json({message: 'We need the name and description before it can be saved'})
        }else{
            const newProject = await Projects.insert(req.body)
            res.status(201).json(newProject)
        }
    }catch(err){
        res.status(500).json({message: 'There was an issue accessing the server'})
    }
})

router.put('/:id', validateProjectId, async (req, res, next => {
    try{
        const {name, description, completed} = req.body
        if(!name || !description || typeof completed === 'undefined'){
            res.status(400).json({message: 'We need all the information'})
        }else{
            const updatedProject = await Projects.update(req.params.id, req.body)
            res.status(200).json(updatedProject)
        }
    }catch(err){
        next(err)
    }
}))

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try{
        await Projects.remove(req.params.id)
        res.end()
    }catch(err){
        next(err)
    }
})

module.exports = router