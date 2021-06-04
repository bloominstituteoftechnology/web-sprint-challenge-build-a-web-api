const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

const server = express();

// middlewares
server.use(express.json());
server.use(helmet());
server.use(cors());

// server error middleware
server.use((err, req, res, next) => {
	// eslint-disable-line
	res.status(500).json({
		error: err.message,
		message: "Something happened with the server",
	});
});

// routers
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

// defaults
server.use("/api", (_, res) => {
	res.json({ data: "API is accounted for" });
});

server.use("/", (req, res) => {
	res.send(`<h2>Welcome to our API!</h2>`);
});

module.exports = server;
