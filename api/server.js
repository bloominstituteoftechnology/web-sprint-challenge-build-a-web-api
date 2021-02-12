const express = require('express')
const helmet = require('helmet')

const server = express();

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use(helmet());
server.use(express.json())

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req,res) =>{
    res.status(200).json({message: 'API running', env: process.env.NODE_ENV})
})


// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
