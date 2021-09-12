/* eslint-disable */
const express = require("express");
const server = express();

// Do NOT `server.listen()` inside this file!
server.use(express.json());

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send(`This is Sparta!`);
});
server.get("/api", (req, res) => {
  res.json({ message: "api is working" });
});
server.get("/api/projects", (req, res) => {
  res.json({ message: "projects here" });
});
server.get("/api/actions", (req, res) => {
  res.json({ message: "actions here" });
});

server.use(function (req, res) {
  res.status(404).send("404 - This Page not found");
});

module.exports = server;
