const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use(express.json());
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Project API<h2>
    <p>Welcome to the Lambda Projects API<p>
    `);
});

module.exports = server;
