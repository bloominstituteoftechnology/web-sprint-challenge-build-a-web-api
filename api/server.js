const express = require('express');
const server = express();

const { logger, errorHandling } = require("./server-middleware");
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(express.json());
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);
server.use(logger);

server.get("/", (req, res) => {
  res.json("Hello this is inside server.js");
});

server.use('*', (req, res, next) => {
  next({ status: 404, message: `${req.method} ${req.originalUrl} not found!` })
});

server.use(errorHandling)

module.exports = server;
