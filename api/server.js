const express = require('express');

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

const server = express();
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;
