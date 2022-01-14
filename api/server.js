const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(express.json());
server.use('/api/projects/:id/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
	res.send('<h1>x</h1>');
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
