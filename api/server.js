const express = require('express');
const { logger } = require('./middleware/middleware');
const server = express();

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

// Configure your server here
server.use(express.json());

server.use(logger);

// Build your actions router in /api/actions/actions-router.js
server.use('/api/actions', actionsRouter);
// Build your projects router in /api/projects/projects-router.js
server.use('/api/projects', projectsRouter);

// Do NOT `server.listen()` inside this file!

server.use('*', (req, res) => {
	res.status(404).send(`
       <p>Oops, can't find that!</p>
  `);
});

// eslint-disable-next-line
server.use((err, req, res, next) => {
	console.log('err handling middleware kicking in!', err.message);
	res.status(err.status || 500).json({
		custom: 'something exploded inside the app',
		message: err.message,
		stack: err.stack
	});
});

module.exports = server;
