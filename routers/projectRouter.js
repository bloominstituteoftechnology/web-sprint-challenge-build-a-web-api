const express = require('express');
const dbProject = require('../data/helpers/projectModel.js')
const router = express.Router();



router.get('', (req, res) => {
    dbProject.get()
    .then(allProjects => {
        res.status(200).json(allProjects)    
    })
    .catch(err => {
        res.status(500).json({
            error: 'There was a router error retrieving projects data.'
        })
    })
})

router.get('/:id', (req, res) => {
    dbProject.get(req.params.id)
    .then(project => {
        res.status(200).json(project)    
    })
    .catch(err => {
        res.status(500).json({
            error: 'There was a router error retrieving that project data.'
        })
    })
})

router.get('/:id/actions', (req, res) => {
    dbProject.getProjectActions(req.params.id)
        .then(actions => {
            res.status(201).json(actions)    
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was a router error retrieving the actions for that project.'
            })
        })
})

router.post('/', (req, res) => {
    dbProject.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)    
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was a router error adding that project.'
            })
        })
})

router.put('/:id', (req, res) => {
    dbProject.update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(201).json(updatedProject)    
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was a router error updating that project.'
            })
        })
})

router.delete('/:id', (req, res) => {
    dbProject.remove(req.params.id)
        .then(removedProject => {
            res.status(200).json(removedProject)    
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was a router error deleting that project.'
            })
        })
})




module.exports = router;