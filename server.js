//* Added cors dependency, because you should 
//* Opted-in to using express.json

const express = require("express"); 
const cors = require("cors"); 

const server = express(); 

//* routers go here *//
const projectRouter = require("./projects/projectRouter")

//* dependencies and opt-ins go here *// 
server.use(express.json()); 
server.use(cors()); 

//* 'turn on' routers here *// 
server.use("/api/projects", projectRouter)

server.get("/", (req, res) => {
    res.send({ message: "Welcome to the Sprint Challenge!" }); 
}); 

module.exports = server; 