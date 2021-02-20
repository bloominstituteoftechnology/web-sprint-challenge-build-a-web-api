const express = require('express');
const actionRouter=require('./actions/actions-router')
const projectRouter=require("./projects/projects-router")
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use("/api/actions",actionRouter)
server.use("/api/projects",projectRouter)
server.get("/",(req,res)=>{
    res.send("Welcome to Sprint Api Challenge")
})

module.exports = server;
