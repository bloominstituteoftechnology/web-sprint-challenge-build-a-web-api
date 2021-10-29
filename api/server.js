const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
const { logger, handleError } = require('./projects/projects-middleware')

server.use(express.json())
server.use('/api/actions', actionsRouter)
server.use('/api/projects', logger, projectsRouter)



server.use('*', (req, res, next) => {
    next({
        status: 404,
        message: `${req.method} ${req.originalUrl} not found!`
    })
})

// server.use(handleError)

module.exports = server;
