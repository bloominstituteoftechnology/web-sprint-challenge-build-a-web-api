const express = require('express');
const server = express();

//imported middleware
const logger = require('morgan'); 
const projectRouter = require('./projectRouter');
const actionRouter = require('./actionRouter');

//server.user(middlewares)
server.use(express.json(), logger('short'));
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);

server.get('/', (req, res)=>{
    res.status(200).json({message: `Hello from the get`})
})

module.exports = server;