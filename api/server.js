const express = require('express');
const projectRouters = require('./projects/projects-router');
const actionRouters = require('./actions/actions-router');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Here is a server')
}) 
server.use('/api/projects', projectRouters)
server.use('/api/actions', actionRouters)

module.exports = server;
