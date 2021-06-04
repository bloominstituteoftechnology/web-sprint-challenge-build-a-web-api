const request = require("supertest");
const db = require("./data/dbConfig");
const Action = require("./api/actions/actions-model");
const Project = require("./api/projects/projects-model");
const server = require("./api/server");

const projectA = {
	name: "a",
	description: "b",
	completed: false,
};
const projectB = {
	name: "c",
	description: "d",
	completed: true,
};
const actionA = {
	project_id: 1,
	description: "x",
	notes: "y",
	completed: false,
};
const actionB = {
	project_id: 1,
	description: "u",
	notes: "v",
	completed: true,
};
const actions = [actionA, actionB];

beforeAll(async () => {
	await db.migrate.latest();
});
beforeEach(async () => {
	await db("actions").truncate();
	await db("projects").truncate();
	await db("projects").insert(projectA);
	await db("projects").insert(projectB);
	await db("actions").insert(actionA);
	await db("actions").insert(actionB);
});
afterAll(async (done) => {
	await db.destroy();
	done();
});

it("sanity check", () => {
	expect(true).not.toBe(false);
});

describe("server.js", () => {
	// 👉 ACTIONS
	// 👉 ACTIONS
	// 👉 ACTIONS
	describe("actions endpoints", () => {
		describe("[GET] /api/actions", () => {
			it("sends back all actions that exist", async () => {
				const res = await request(server).get("/api/actions");
				expect(res.body).toHaveLength(2);
				expect(res.body[0]).toMatchObject(actionA);
				expect(res.body[1]).toMatchObject(actionB);
			}, 500);
			it("sends back empty array if no actions", async () => {
				await db("actions").truncate();
				const res = await request(server).get("/api/actions");
				expect(res.body).toHaveLength(0);
			}, 500);
		});
		describe("[GET] /api/actions/:id", () => {
			it("sends back the action with given id", async () => {
				const res1 = await request(server).get("/api/actions/1");
				const res2 = await request(server).get("/api/actions/2");
				expect(res1.body).toMatchObject(actionA);
				expect(res2.body).toMatchObject(actionB);
			}, 500);
			it("responds with a 404 if no action with given id", async () => {
				const res = await request(server).get("/api/actions/11");
				expect(res.status).toBe(404);
			}, 500);
		});
		describe("[GET] /api/projects/:id/actions", () => {
			it("sends back the actions in project with given id", async () => {
				const res = await request(server).get("/api/projects/1/actions");
				expect(res.body).toMatchObject(actions);
			}, 500);
			it("sends back empty array if no actions in project with given id", async () => {
				const res = await request(server).get("/api/projects/2/actions");
				expect(res.body).toMatchObject([]);
			}, 500);
		});
		describe("[POST] /api/actions", () => {
			it("responds with the newly created action", async () => {
				const actionNew = {
					project_id: 2,
					description: "m",
					notes: "n",
					completed: false,
				};
				const res = await request(server).post("/api/actions").send(actionNew);
				expect(res.body).toMatchObject(actionNew);
			}, 500);
			it("inserts a new action into actions table", async () => {
				const actionNew = {
					project_id: 2,
					description: "m",
					notes: "n",
					completed: false,
				};
				await request(server).post("/api/actions").send(actionNew);
				const action = await Action.get(3);
				expect(action).toMatchObject(actionNew);
			}, 500);
			it("responds with a 400 if the request body is missing required fields", async () => {
				const actionNew = { project_id: 2, description: "m" };
				const res = await request(server).post("/api/actions").send(actionNew);
				expect(res.status).toBe(400);
			}, 500);
		});
		describe("[PUT] /api/actions/:id", () => {
			it("responds with the updated action", async () => {
				const action = await Action.get(1);
				const changes = { ...action, completed: true };
				expect(action.completed).toBe(false);
				const res = await request(server).put("/api/actions/1").send(changes);
				expect(res.body).toMatchObject(changes);
			}, 500);
			it("updates the action in the actions table", async () => {
				let action = await Action.get(1);
				await request(server)
					.put("/api/actions/1")
					.send({ ...action, completed: true });
				action = await Action.get(1);
				expect(action.completed).toBe(true);
			}, 500);
			it("responds with a 400 if the request body is missing all fields", async () => {
				const res = await request(server).put("/api/actions/1").send({});
				expect(res.status).toBe(400);
			}, 500);
		});
		describe("[DELETE] /api/actions/:id", () => {
			it("deletes the action with the given id", async () => {
				await request(server).delete("/api/actions/1");
				let actions = await Action.get();
				expect(actions).toMatchObject([actionB]);
				await request(server).delete("/api/actions/2");
				actions = await Action.get();
				expect(actions).toMatchObject([]);
			}, 500);
			it("responds with a 404 if no action with given id", async () => {
				const res = await request(server).get("/api/actions/11");
				expect(res.status).toBe(404);
			}, 500);
		});
	});

	// 👉 PROJECTS
	// 👉 PROJECTS
	// 👉 PROJECTS
	describe("projects endpoints", () => {
		describe("[GET] /api/projects", () => {
			it("sends back all projects that exist", async () => {
				const res = await request(server).get("/api/projects");
				expect(res.body).toHaveLength(2);
				expect(res.body[0]).toMatchObject(projectA);
				expect(res.body[1]).toMatchObject(projectB);
			}, 500);
			it("sends back empty array if no projects", async () => {
				await db("projects").truncate();
				const res = await request(server).get("/api/projects");
				expect(res.body).toHaveLength(0);
			}, 500);
		});
		describe("[GET] /api/projects/:id", () => {
			it("sends back the project with given id", async () => {
				const res1 = await request(server).get("/api/projects/1");
				const res2 = await request(server).get("/api/projects/2");
				expect(res1.body).toMatchObject(projectA);
				expect(res2.body).toMatchObject(projectB);
			}, 500);
			it("responds with a 404 if no project with given id", async () => {
				const res = await request(server).get("/api/projects/11");
				expect(res.status).toBe(404);
			}, 500);
		});
		describe("[POST] /api/projects", () => {
			it("responds with the newly created project", async () => {
				const projectNew = { name: "e", description: "f", completed: true };
				const res = await request(server)
					.post("/api/projects")
					.send(projectNew);
				expect(res.body).toMatchObject(projectNew);
			}, 500);
			it("inserts a new project into projects table", async () => {
				const projectNew = { name: "e", description: "f", completed: true };
				await request(server).post("/api/projects").send(projectNew);
				const project = await Project.get(3);
				expect(project).toMatchObject(projectNew);
			}, 500);
			it("responds with a 400 if the request body is missing required fields", async () => {
				const projectNew = { name: "e" };
				const res = await request(server)
					.post("/api/projects")
					.send(projectNew);
				expect(res.status).toBe(400);
			}, 500);
		});
		describe("[PUT] /api/projects/:id", () => {
			it("responds with the updated project", async () => {
				const changes = { ...projectA, completed: true };
				const res = await request(server).put("/api/projects/1").send(changes);
				expect(res.body).toMatchObject(changes);
			}, 500);
			it("updates the project in the projects table", async () => {
				const changes = { ...projectA, completed: true };
				await request(server).put("/api/projects/1").send(changes);
				const project = await Project.get(1);
				expect(project.completed).toBe(true);
			}, 500);
			it("responds with a 400 if the request body is missing all fields", async () => {
				const res = await request(server).put("/api/projects/1").send({});
				expect(res.status).toBe(400);
			}, 500);
		});
		describe("[DELETE] /api/projects/:id", () => {
			it("deletes the action with the given id", async () => {
				await request(server).delete("/api/projects/1");
				let res = await Project.get();
				expect(res).toMatchObject([projectB]);
				await request(server).delete("/api/projects/2");
				res = await Project.get();
				expect(res).toMatchObject([]);
			}, 500);
			it("responds with a 404 if no project with given id", async () => {
				const res = await request(server).delete("/api/projects/11");
				expect(res.status).toBe(404);
			}, 500);
		});
	});
});
