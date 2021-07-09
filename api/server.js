const express = require('express')
const server = express()
// pull in routers
// pull in middleware


server.use(express.json())



module.exports = server
