const express = require('express');
const server = express();

server.get('*', (req,res) => {
    res.status(200).json({
        message: 'Welcome To My Sprint Submission'
    })
})

module.exports = server;
