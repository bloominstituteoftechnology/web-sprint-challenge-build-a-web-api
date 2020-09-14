
const server = require('./server');

const port = 3000;

server.listen(port, () => {
    console.log(`\n*Server is up and running on port ${port}*\n`)
})