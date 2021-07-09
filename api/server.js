const express = require('express')
const server = express()
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use(express.json())

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

module.exports = server
