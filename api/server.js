const express = require("express");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
