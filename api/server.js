const express = require("express");
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

const helmet = require("helmet");
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(helmet());
server.use(express.json());
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

module.exports = server;
