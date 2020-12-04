const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json())

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Llamas</h2>
      <p>Your server is working!</p>
    `);
  });



module.exports = server;
