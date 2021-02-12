const express = require('express');
const server = express();
const helmet = require('helmet')

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use(helmet());
server.use(express.json())
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)


// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
