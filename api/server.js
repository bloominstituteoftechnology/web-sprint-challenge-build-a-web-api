const express = require("express");
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");
const { logger } = require("./actions/actions-middlware");

server.use("/", logger);
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
	res.send(`<h2>Let's get this project done.</h2>`);
});

module.exports = server;
