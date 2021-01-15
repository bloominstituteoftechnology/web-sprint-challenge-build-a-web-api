const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

server.use(express.json());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

// curl http://localhost:5000/
server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' })
});

module.exports = server;
