/* IMPORTS */
require('dotenv').config();

const server = require('./api/server');
const actionsRouter = require('./api/actions/actions-router');
const projectsRouter = require('./api/projects/projects-router');

/* ROUTERS */
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

/* ENV VARIABLES */
const port = process.env.PORT || 5000;

/* Server Start */
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});