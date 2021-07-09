const express = require('express')
const server = express()
// const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
// pull in global middleware? logger?

server.use(express.json())

// server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

module.exports = server