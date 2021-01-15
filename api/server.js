const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

module.exports = server;
