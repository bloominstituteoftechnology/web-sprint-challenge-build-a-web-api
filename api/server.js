const express = require('express');
const server = express();
// const actionsRouter=require("./actions/actions-router");
// const projectsRouter= require("./projects/projects-router")
// Complete your server here!
// Do NOT `server.listen()` inside this file!
const actionsRouter=require("./actions/actions-router");
const projectsRouter= require("./projects/projects-router")
server.use(express.json())
function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} `);
  
    next();
  }
  
server.use(logger)
server.use(projectsRouter)
server.use(actionsRouter)
server.get('/', (req, res) => {
    res.send(`
      <p>Server is working!</p>
    `);
  });
module.exports = server;
