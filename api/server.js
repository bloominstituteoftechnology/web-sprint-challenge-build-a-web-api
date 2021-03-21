const express = require('express');
const server = express();
const morgan = require('morgan')//server logger
const helmet =require('helmet')// helmet encrypts server
const actionsRouter =require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')


server.use(helmet());
server.use(morgan('dev'));
server.use(express.json())
server.use(actionsRouter)
server.use(projectsRouter)

server.get('*', (req, res) => {
    res.status(200).json({ message: 'Hopes this works!' })
})
server.get('/', (req, res) => {
    
    res.send(`
      <h2>Kato API</h2>
      <p>Welcome Kato API</p>
    `);
  });
module.exports = server;
