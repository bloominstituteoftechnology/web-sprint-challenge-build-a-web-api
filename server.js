


const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

require('colors')


const server = express()

const actionRouter = require('./actions/actionRouter')
const projectRouter = require('./projects/projectRouter')

server.use(cors())
server.use(helmet())
server.use(morgan('dev'))
server.use(express.json())


server.use('/projects', projectRouter)
server.use('/actions', actionRouter)



server.get('/', (req,res)=>{ 
    res.send("endpoint running")
 })


module.exports = server 