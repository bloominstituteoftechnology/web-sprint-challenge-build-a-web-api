const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const server = require('./api/server');

server.use(cors());
server.use(express.static(path.join(__dirname, 'client/build')));

console.log(process.env.USER);
console.log(process.env.SHELL);

if (process.env.NODE_ENV === 'production') {
	console.log('this means this code is deployed');
}

const PORT = process.env.PORT || 5000;

console.log('port is -> ', PORT); // tes

server.listen(PORT, () => {
	console.log(`\n*** Server Running on http://localhost:${PORT}***\n`);
});
