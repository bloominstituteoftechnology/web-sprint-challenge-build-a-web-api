const express = require("express");
const { logger, handleErrors } = require("./middleware");
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");
const helmet = require("helmet");
const server = express();

server.disable("x-powered-by");
server.use(helmet());
server.use(express.json());
server.use(logger);
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.use("/", (_req, res) => {
  res.send("<h2>API located at /api</h2>");
});

server.use(handleErrors);

module.exports = server;
