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


// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
