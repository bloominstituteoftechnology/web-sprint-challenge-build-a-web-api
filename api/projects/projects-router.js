// Write your "projects" router here!
const express = require("express")
const projects = require("./projects-model")
const { validateProjectId, validateProject } = require("../middleware/middleware")


const router = express.Router()

// #1 `[GET] /api/projects` returns an array of projects (or an empty array) as the body of the response.
router.get("/api/projects", async (req, res, next) => {
    try {
        const project = await projects.get()
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
})

// #2 `[GET] /api/projects/:id` returns a project with the given `id` as the body of the _response_.
router.get("/api/projects/:id", validateProjectId(), (req, res) => {
    res.status(200).json(req.action)
})

// #3 `[POST] /api/projects` returns the newly created project as the body of the _response_.
router.post("/api/projects", validateProject(), async (req, res, next) => {
    try {
        const project = await projects.insert(req.body)
        res.status(201).json(project)
    } catch (err) {
        next(err)
    }
})

// #4 `[PUT] /api/projects/:id` returns the updated project as the body of the _response_.
router.put("/api/projects/:id", validateProject(), async (req, res, next) => { // validateProjectId(),??
    try {
        const project = await projects.update(req.params.id, req.body)
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
})

// #5 `[DELETE] /api/projects/:id` returns no _response_ body.
router.delete("/api/projects/:id", async (req, res, next) => { // validateProjectId(),??
    try {
        await projects.remove(req.params.id)
        res.status(200).json()
    } catch (err) {
        next(err)
    }
})

// #6 `[GET] /api/projects/:id/actions` sends an array of actions (or an empty array) as the body of the response.
router.get("/api/projects/:id/actions", async (req, res, next) => {
    try {
        const action = await projects.get()
        res.status(200).json(action)
    } catch (err) {
        next(err)
    }
})

module.exports = router