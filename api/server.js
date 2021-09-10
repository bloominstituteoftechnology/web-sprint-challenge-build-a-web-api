const express = require('express');
const helmet = require('helmet')
const cors = require ('cors')

const server = express();


server.use('/api/posts', postsRouter)

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;



//seed: nodeProj3, nodeProj2

const { logger } = require('./middleware/middleware') //ctrl + space
const usersRouter = require('./users/users-router')
// remember express by default cannot parse JSON in request bodies
server.use(express.json())
server.use(logger)
server.use('/api/users', usersRouter)
// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})
