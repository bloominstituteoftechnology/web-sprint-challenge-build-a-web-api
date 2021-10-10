// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()
const {validateProjectId, validateProject} = require('./projects-middleware')

router.get('/', async (req, res, next) => {
    try{
        const projects = await Projects.get()
        res.status(200).json(projects)
    }catch(err){
        next(err)
    }
})

router.get('/:id', validateProjectId, (req, res, next) => {
    try{
        res.json(req.project)
    }catch(err){
        next(err)
    }
})

router.post('/', async (req, res) => {
    try{
        const newProject = await Projects.insert({
            name: req.name,
            description: req.description,
            completed: req.completed
        })
        res.status(201).json(newProject)
    }catch(err){
        next(err)
    }
})

router.put('/:id', validateProjectId, validateProject (req, res, next => {
    const {name, description, completed} = req.body
    if(!name || !description, !completed){
        res.status(400).json({message: 'The project with that ID does not exist'})
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
}))

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try{
        await Projects.remove(req.params.id)
        res.json(res.Projects)
    }catch(err){
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        if(actions.length > 0){
            res.status(200).json(actions)
        }else{
            res.status(404).json((actions))
        }
    })
    .catch(next)
})

module.exports = router