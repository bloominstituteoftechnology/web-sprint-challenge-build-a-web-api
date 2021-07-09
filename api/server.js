const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use(express.json());

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const {
    logger,
    notFound,
    errorHandling,
} = require('./middleware/middleware');

server.use('/', logger);

server.get('/', (req, res, next) => {
    res.send(`Server is up and running!`);
});

server.use('/api/actions', actionsRouter);

server.use('/api/projects', projectsRouter);

server.use('*', notFound);

server.use(errorHandling);

module.exports = server;