const express = require('express');
const projectRouters = require('./projects/projects-router');
const actionRouters = require('./actions/actions-router');
const server = express();

server.use(express.json());
server.use('/projects', projectRouters)
server.use('/actions', actionRouters)

server.get('/', (req, res) => {
    res.send('Here is a server')
}) 

module.exports = server;
