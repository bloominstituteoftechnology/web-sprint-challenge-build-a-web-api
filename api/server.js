const express = require('express');
const server = express();
const morgan = require('morgan')
const helmet =require('helmet')
const actionsRouter =require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')


server.use(helmet());
server.use(morgan('dev'));
server.use(express.json())
server.use(actionsRouter)
server.use(projectsRouter)
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.get('*', (req, res) => {
    res.status(200).json({ message: 'Hopes this works!' })
})

server.get('/', (req, res) => {

    res.send(`
      <h2>Fabian's Api</h2>
      <p>wow! it actually works</p>
    `);
  });




module.exports = server;
