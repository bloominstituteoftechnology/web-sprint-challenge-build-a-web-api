const express = require('express');
const server = express();

const projectRouter = require("./projects/projects-router.js");
const actionsRouter = require("./actions/actions-router.js");

server.use(express.json());
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionsRouter)



module.exports = server;
