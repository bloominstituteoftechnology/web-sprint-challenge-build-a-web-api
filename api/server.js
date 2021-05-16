const express = require('express');
const server = express();
const morgan = require('morgan')
const helmet = require('helmet')
const actionsRouter = require('./actions/actions-model')
const projectsRouter = require('./projects/projects-router')

server.use(helmet())
server.use(morgan('dev'))
server.use(express.json())
server.use(actionsRouter)
server.use(projectsRouter)
// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.get('*', (req, res) => {
    res.status(200).json({ message: 'all works!' })
})
server.get('/', (req, res) => {

    res.send(`
      <h2>API</h2>
    `);
  });


module.exports = server;
