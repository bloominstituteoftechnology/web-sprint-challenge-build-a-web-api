const express = require("express");

const actionsRouter = require("./actionsRouter");
const projectsRouter = require("./projectsRouter");

const server = express();

server.use(express.json());
server.use(actionsRouter);
server.use(projectsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is working" });
});

module.exports = server;
