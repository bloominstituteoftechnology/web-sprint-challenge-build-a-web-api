const server = require('./api/server');
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 6660
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', (_, res) => {
    res.json({
        data: "API is connected"
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
