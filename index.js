const server = require("./api/server")

const port = process.env.PORT || 3000

server.listen(port)
console.log(`Your server is listening on port ${port}`)
