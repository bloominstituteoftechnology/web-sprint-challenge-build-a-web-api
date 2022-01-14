require('dotenv').config();

const express = require('express');
const server = express();

// server.get('/api/users', (req, res) => {
//   res.json([
//     { id: 1, username: 'food' },
//     { id: 2, username: 'bar' },
//     { id: 3, username: 'baz' },
//   ])
// })

const PORT = process.env.PORT || 8888

server.listen(PORT, () => {
console.log(`listening on port ${PORT}`)
})