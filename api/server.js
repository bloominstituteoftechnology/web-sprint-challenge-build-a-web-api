/* eslint-disable */
const express = require("express");
const server = express();
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use(express.json());

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

const { logger, errorHandling } = require("../middleware/middleware");

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.use("/", logger);
server.use(errorHandling);

server.get("/", (req, res, next) => {
  res.send(`Server is up and running!`);
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
server.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});
server.use(function (req, res) {
  res.status(404).send("Page not found");
});

module.exports = server;
