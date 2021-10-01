const express = require("express");
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");
//global middleware goes here

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

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
