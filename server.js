const express = require('express'); 
const helmet = require('helmet')

const server = express();

server.use(helmet());

server.use(express.json()); 

const projectRouter = require('./projectRouter'); 
server.use('/api/projects', projectRouter);


server.use((err, req, res, next) => {
  res.status(500).json({
    message: "Not working out so well",
    err
  });
})

module.exports = server;