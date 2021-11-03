const express = require("express");
const routerAction = require("./actions/actions-router");
const routerProject = require("./projects/projects-router");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});
server.use("/api/actions", routerAction);
server.use("/api/projects", routerProject);

module.exports = server;
