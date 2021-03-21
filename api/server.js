const express = require('express');
const server = express();
const morgan = require('morgan')//server logger
const helmet =require('helmet')// helmet encrypts server
const actionsRouter =require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')


server.use(helmet());
server.use(morgan('dev'));
server.use(express.json())
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)


module.exports = server;
