const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        if(!projects){
            res.status(200).json([])
        }else{
            res.status(200).json(projects)
        }
    })
    .catch(() => {
        res.status(500).json({message: 'error'})
    })
})

router.get('/:id', (req, res, ) => {
    Projects.get(req.params.id).then(project => {
        if(!project){
            res.status(404).json({message: 'The project with this id was not found'})
        }else{
            res.status(200).json(project)
        }
    })
    .catch(() => {
        res.status(500).json({message: 'Error'})
    })
})

router.post('/', (req, res) => {
    const newProject = req.body
    Projects.insert(newProject)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
})

router.put('/:id', (req, res, next) => {
    const {name, description, completed} = req.body
    if(!name || !description || !completed){
        res.status(400).json({message: 'update'})
    }else{
        Projects.update(req.params.id, req.body)
        .then(() => {
            return Projects.get(req.params.id)
        })
        .then(project => {
            res.json(project)
        })
        .catch(next)
    }
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then((deletedProject) => {
        if(!deletedProject){
            res.status(404).json({message: 'The project with this id does not exist'})
        }else{
            res.status(200).json()
        }
    })
    .catch(() => {
        res.status(500).json({message: 'error'})
    })
})

router.get('/:id/actions', (req, res) => {
    Projects.get(req.params.id)
    .then((actions) => {
        if(!actions){
            res.status(404).json({message: 'The project with this id does not exist'})
        }else{
            Projects.getProjectActions(req.params.id).then((actions) => {
                res.status(200).json(actions)
            })
        }
    })
    .catch(() => {
        res.status(500).json({message: 'error'})
    })
})

module.exports = router