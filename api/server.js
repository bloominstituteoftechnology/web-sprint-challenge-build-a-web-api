const express = require("express");
const actionRouter = require("./actions/actions-router");
const projectRouter = require("./projects/projects-router");
const server = express();
server.use(express.json());

server.use("/actions", actionRouter);
server.use("/projects", projectRouter);

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
