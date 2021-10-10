const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
function logger(req, res, next){
    console.log(`${req.method} request`)
    next()
}

const errHandling = (err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({message: err.message})
}

server.use(express.json())
server.use('/api/actions', logger, actionsRouter)
server.use('/api/projects', logger, projectsRouter)

server.get('/', (req, res) => {
    res.send(`<h2>API is running</h2>`)
})

module.exports = server;
