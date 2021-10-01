const express = require("express");
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

const server = express();

server.use(express.json());

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

//error handling
server.use("*", (req, res, next) => {
  next({ status: 404, message: `${req.method} ${req.originalUrl} not found!` });
});

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  });
}

server.use(errorHandling);

module.exports = server;
