const express = require('express');
const server = express();
const actionRouter = require('./actions/actions-router')
const projectRouter = require('./projects/projects-router')

// Configure your server here

server.use(express.json())
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)



// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
