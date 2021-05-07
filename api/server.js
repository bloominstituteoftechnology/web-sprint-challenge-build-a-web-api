const express = require("express");
const { logger, handleErrors } = require("./middleware");
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");
const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js

server.use("/", (_req, res) => {
  res.send("<h2>API located at /api</h2>");
});

server.use(handleErrors);

module.exports = server;
