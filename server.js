const express = require('express');

const userProject = require('./project/userProject')
const userAction = require('./actions/userAction')

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/projects', userProject)
server.use('/api/actions', userAction);

module.exports = server;