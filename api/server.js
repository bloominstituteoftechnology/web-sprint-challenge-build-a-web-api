/* eslint-disable no-unused-vars */
const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
function logger(req, res, next) {
    console.log(`${req.method} request`)
    next()
  }

const notFound = (req, res, next) => {
    res.status(404).json({
        message: 'Not found, sorry!'
    })
}

const errorHandling = (err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({
        message: err.message,
    })
}

server.use(express.json())

server.use('/api/projects', logger, projectsRouter)
server.use('/api/actions', logger, actionsRouter)

server.use('*', notFound)

server.use(errorHandling)

server.get('/', (req, res) => {
    res.send(`<h2>Hello!</h2>`)
 })
module.exports = server;
