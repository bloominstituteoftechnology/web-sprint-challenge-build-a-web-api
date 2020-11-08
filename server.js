const express = require('express');
const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to Sam G's Web API Sprint!</h1>
        <h2>Please use postman/insomnia to test.</h2>
    `)
})

module.exports = server;