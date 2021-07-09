const express = require('express');
const projectRouter = require('./projects/projects-router')
const actionRouter = require('./actions/actions-router')
const server = express();

server.use(express.json())


// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)


server.use(express.json());
server.use(helmet());
server.use(cors());


server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
  
    })
})

module.exports = server;