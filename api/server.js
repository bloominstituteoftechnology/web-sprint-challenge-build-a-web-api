const express = require("express");
const projectRouter = require("./projects/projects-router.js");
const actionRouter = require("./actions/actions-router.js");
const server = express();

// Custom Middleware
function logger(req, res, next) {
  console.log(
    "Req Method: ",
    req.method,
    ", Req URL: ",
    req.url,
    ", Req Timestamp: ",
    new Date().toString()
  );
  next();
}

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(logger);
server.use("/api", projectRouter);
//server.use("/api", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h2>App test - When you finish this, play video games!</h2>`);
});

module.exports = server;
