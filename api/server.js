const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

const actionsRouter = require('./actions/actions-router')
const projectRouter = require('./projects/projects-router')

server.use(express.json());
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectRouter)

server.get('*', (req, res) => {
    res.status(200).json({ message: 'Heres hoping this works!' })
})

module.exports = server;
