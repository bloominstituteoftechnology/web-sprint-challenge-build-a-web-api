const express = require('express');
const actionRouter = require('../api/actions/actions-router');
const projectRouter = require('../api/projects/projects-router');
const server = express();

const helmet = require("helmet");
server.use(express.json())
server.use(helmet())

server.use("/api/actions", actionRouter)
server.use("/api/projects", projectRouter)

server.use('*', handleError)


module.exports = server;



function handleError(err, req, res, next) { // eslint-disable-line
    res.status(404).json({ error: 'Something went wrong please check your url', message: err.message })
}