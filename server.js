const express = require('express');
const server = express();

const dbProject = require('./data/helpers/projectModel.js')
const dbActions = require('./data/helpers/actionModel.js')

server.use(express.json())

server.get('/', (req, res) => {
    res.send(`
    <h1>Welcome to Sam G's Web API Sprint!</h1>
    <h2>Please use postman/insomnia to test.</h2>
    `)
})

// --------------------------------- //
// PROJECT ENDPOINTS
// --------------------------------- //
server.get('/api/projects', (req, res) => {
    dbProject.get()
    .then(allProjects => {
        res.status(200).json(allProjects)    
    })
    .catch(err => {
        res.status(500).json({
            error: 'There was a server error retrieving projects data.'
        })
    })
})

server.get('/api/projects/:id', (req, res) => {
    dbProject.get(req.params.id)
    .then(project => {
        res.status(200).json(project)    
    })
    .catch(err => {
        res.status(500).json({
            error: 'There was a server error retrieving that project data.'
        })
    })
})

server.get('/api/projects/:id/actions', (req, res) => {
    dbProject.getProjectActions(req.params.id)
        .then(actions => {
            res.status(201).json(actions)    
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was a server error retrieving the actions for that project.'
            })
        })
})

server.post('/api/projects/', (req, res) => {
    dbProject.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)    
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was a server error adding that project.'
            })
        })
})

server.put('/api/projects/:id', (req, res) => {
    dbProject.update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(201).json(updatedProject)    
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was a server error updating that project.'
            })
        })
})

server.delete('/api/projects/:id', (req, res) => {
    dbProject.remove(req.params.id)
        .then(removedProject => {
            res.status(200).json(removedProject)    
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was a server error deleting that project.'
            })
        })
})

// --------------------------------- //
// ACTIONS ENDPOINTS
// --------------------------------- //
server.get('/api/actions' , (req, res) => {
    dbActions.get()
        .then(allActions => {
            res.status(200).json(allActions)
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was server error retrieving the actions data.'
            })
        })
})

server.get('/api/actions/:actionID' , (req, res) => {
    dbActions.get(req.params.actionID)
        .then(allActions => {
            res.status(200).json(allActions)
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was server error retrieving that action data.'
            })
        })
})

server.post('/api/actions/:projectID' , (req, res) => {
    dbActions.insert({...req.body, project_id: req.params.projectID})
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was server error adding that action.'
            })
        })
})

server.put('/api/actions/:actionID' , (req, res) => {
    dbActions.update(req.params.actionID, req.body)
        .then(updatedAction => {
            res.status(201).json(updatedAction)
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was server error updating that action.'
            })
        })
})

server.delete('/api/actions/:actionID' , (req, res) => {
    dbActions.remove(req.params.actionID)
        .then(deletedAction => {
            res.status(200).json(deletedAction)
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was server error deleting that action.'
            })
        })
})

module.exports = server;