const express = require('express');
const server = express();
const actionRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router');

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running!' });
});

server.use(express.json())
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

module.exports = server;