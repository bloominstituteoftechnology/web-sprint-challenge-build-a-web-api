const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')


server.use(express.json())
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter)

server.get('/', (req, res) => {
    res.send(`<h1>Yoooo</h1>`)
})
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
