const express = require('express');
const actionRouter =  require('./data/actions/actionsRouter');
const projectRouter = require('./data/project/projectRouter');
const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/project', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (_, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


function logger(req, _, next) {
  console.log(
    "Method: ", req.method + "\n",
    "URL: ", req.url + "\n", 
    "Time: ", new Date(Date.now()) + "\n",
    "Body:", req.body,
  )
  next();
}

const PORT = 5003;
server.listen(PORT, () => {
    console.log('\nServer is running on ' + PORT);
})

module.exports = server
