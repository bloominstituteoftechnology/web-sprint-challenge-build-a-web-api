const express = require('express');
const server = express();
server.use(express.json())

const actionRouter = require('./actions-router.js')

const projectsRouter = require('./projects-router.js')





server.use('/actions', actionRouter);

server.use('/projects', projectsRouter);

server.get('/', (req,res) => {
    res.send(`<h2>Lets do this sprint!</h2>`)
})

module.exports = server;

// Complete your server here!
// Do NOT `server.listen()` inside this file!
