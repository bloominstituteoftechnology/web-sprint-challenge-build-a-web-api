const express = require('express');
const server = express();

const actions = require("./actions/actions-router")

const projects = require("./projects/projects-router") 
server.use(express.json())
server.use("api/actions", actions)
server.use("/api/projects", projects) 

module.exports = server;