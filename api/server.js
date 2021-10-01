const express = require('express');
const server = express();
const actionRouter = require('./actions/actions-router')
const projectRouter = require('./projects/projects-router')

// Configure your server here

server.use(express.json())
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)



module.exports = server;
