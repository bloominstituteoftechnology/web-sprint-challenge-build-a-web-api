const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.use(express.json())


module.exports = server;
