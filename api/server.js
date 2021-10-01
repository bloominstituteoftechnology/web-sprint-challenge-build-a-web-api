const express = require('express');
const actionRouter = require('../api/actions/actions-router');
const projectRouter = require('../api/projects/projects-router');
const server = express();
server.use(express.json())


server.use("/api/actions", actionRouter)
server.use("/api/projects", projectRouter)

server.use('*', handleError)


module.exports = server;



function handleError(req, res) {
    res.status(500).json({ message: 'Something went wrong please check your url' })
}