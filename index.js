const server = require('./api/server');
const actionsRouter = require('./api/actions/actions-router');
const projectsRouter = require('./api/projects/projects-router');

/* ROUTERS */
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.listen(5000, () => {
    console.log("Listening on port 5000");
});