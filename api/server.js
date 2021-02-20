const express = require('express');
const actionrouter=require('./actions/actions-router')
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())

server.get("/",(req,res)=>{
    res.send("Welcome to Sprint Api Challenge")
})

module.exports = server;
