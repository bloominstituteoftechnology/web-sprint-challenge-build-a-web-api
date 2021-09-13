const express = require('express')
const server = express()
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

function logger(req, res, next) {
    console.log(`${req.method} request`)
    next()
  }

const errorHandling = (err, req, res, next) => { // eslint-disable-line
    const status = err.status || 500
    res.status(status).json({
        message: err.message,
    })
}

server.use(express.json())

server.use('/api/projects', logger, projectsRouter)
server.use('/api/actions', logger, actionsRouter)

server.use(errorHandling)

server.get('/', (req, res) => {
    res.send(`<h2>API is running</h2>`)
 })

module.exports = server