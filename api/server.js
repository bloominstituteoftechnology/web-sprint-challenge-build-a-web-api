const express = require("express");
const { logger, handleErrors, validateID } = require("./middleware");
const server = express();

server.use(express.json());
server.use(logger);

// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js

server.use("/api/actions/:id", validateID);

server.use("*", (_req, res) => {
  res.send("<h2>API located at /api</h2>");
});

module.exports = server;
