require('dotenv').config()
const express = require('express')
const server = express()
const port = process.env.PORT

server.use(express.json())


const actionRoutes = require('./actions/actionRoutes')
const projectRoutes = require('./projects/projectRoutes')


server.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})



server.use('/action', actionRoutes)
server.use('/project', projectRoutes)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})