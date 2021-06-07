const express = require('express')

const server = require('./api/server')

server.use(express.json())

server.listen(4000, () => {
    console.log('Server listening on', 4000)
})
