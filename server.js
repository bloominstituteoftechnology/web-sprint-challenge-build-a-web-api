const express = require('express');
const server = express();

const dbProject = require('./data/helpers/projectModel.js')

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
                error: 'There was a server error adding that project.'
            })
        })
})

server.delete('/api/projects/:id', (req, res) => {
    dbProject.remove(req.params.id)
        .then(removedProject => {
            res.status(201).json(removedProject)    
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was a server error adding that project.'
            })
        })
})


module.exports = server;