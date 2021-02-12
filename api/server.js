const express = require('express');
const helmet = require('helmet');

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

const server = express();

server.use(helmet())
server.use(express.json())

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)


server.get('/', (req, res) => {
    res.send(`<h2>Let's get it!</h2>`)
})
// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
