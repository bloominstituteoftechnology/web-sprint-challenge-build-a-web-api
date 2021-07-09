const express = require('express');
const { logger } = require('./projects/projects-middleware');
const server = express();
// const actionRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');


server.use(express.json());
// server.use('/api/actions', actionRouter);
server.use(logger);
// server.use('/api/projects', projectsRouter);


// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.get('/', (req, res) => {
    res.send(`<h1>Lets write some code</h1>`);
})

module.exports = server;
