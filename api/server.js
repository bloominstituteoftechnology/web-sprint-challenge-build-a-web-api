const express = require('express');
const server = express();

const actions = require("./actions/actions-router");
const projects = require("./projects/projects-router");

server.use(express.json());
server.use(actions);
server.use(projects);

module.exports = server;










