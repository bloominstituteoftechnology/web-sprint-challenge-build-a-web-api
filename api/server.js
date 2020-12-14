const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
