require('dotenv').config()

const server = require('./api/server')
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`\n ***listening on PORT ${PORT}***\n`)
})
