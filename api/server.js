const express = require('express');
const server = express();

// lets your server commmunicate in Json
server.use(express.json())

// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
