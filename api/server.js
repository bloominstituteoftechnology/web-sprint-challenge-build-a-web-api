const express = require('express');
const projectRouter = require('./projects/projects-router');


const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use('/api/projects/', projectRouter)


// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
