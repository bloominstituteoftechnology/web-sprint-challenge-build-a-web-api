const express = require('express');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet')
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
const cors = require('cors');

server.use((req, res, next) => {
    next();
})

server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
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
