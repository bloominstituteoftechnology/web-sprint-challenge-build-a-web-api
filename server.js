const express = require("express");
const Project = require ("./data/helpers/projectModel");
const Action = require("./data/helpers/actionModel")

const server = express();

server.use(express.json());

server.get("/", (req, res)=>{
    res.json({message:"welcome to Sprint Challenge"})
})

server.get("/api/projects", (req,res)=>{
    res.json(Project);
})
module.exports = server;