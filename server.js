const express = require("express");

const server = express();

// const userRouter = require("./users/userRouter");

//custom middleware

function logger(req, res, next) {
  console.log("REQ");
  console.log("URL:", req.url);
  console.log("Method:", req.method);
  console.log("Body:", req.body);
  next();
}

server.use(express.json());
server.use(logger);
// server.use("/api", userRouter);
server.use((err, req, res, next) => {
  res.status(500).json({ message: "Something went wrong" });
});

server.get("/", (req, res) => {
  res.send(`
  <h2>Let's write some middleware!</h2>
  <p>Here we are...</p>
  `);
});

module.exports = server;
