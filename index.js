const server = require('./api/server');

const port = 9000;

server.listen(port, () => {
  console.log(`Server is alive and lives on port ${port}!`);
});
