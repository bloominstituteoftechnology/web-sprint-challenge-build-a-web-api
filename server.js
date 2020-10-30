const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
require('colors')

const actionRouter = require('./data/helpers/actionRouter')
const projectRouter = require('./data/helpers/projectRouter')

const server = express()
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())
server.use(express.json())

server.use('/actions', actionRouter)
server.use('/projects', projectRouter)

server.get('/', (req,res)=>{ 
    res.send("endpoint running")
 })

module.exports = server