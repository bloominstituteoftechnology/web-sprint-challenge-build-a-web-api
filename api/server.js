const express = require("express");
const helmet = require("helmet");
const server = express();
const actionRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router');

//Middleware

server.use(express.json());
server.use(helmet());
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running!" });
});

//action and project routers
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

module.exports = server;