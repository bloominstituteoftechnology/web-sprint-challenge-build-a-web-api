const express = require('express');
const helmet = require('helmet');
const projectsRouter = require('./data/projects/projectsRouter.js');
const actionsRouter = require('./data/actions/actionsRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({ message: "The server is ready!"})
})

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

module.exports = server;