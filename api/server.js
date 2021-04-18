const express = require('express');
const actionRouter = require("./actions/actions-router")
const server = express();
server.use(express.json())


server.use("/actions",actionRouter)

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
