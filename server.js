const express = require("express");

const Actions = require("./actionsRouter");
const Projects = require("./projectsRouter");

const server = express();

server.use(express.json());
server.use(Actions);
server.use(Projects);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is working" });
});

module.exports = server;
