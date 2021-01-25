const express = require('express');
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router')

const server = express();


// middleware
server.use(express.json())

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
