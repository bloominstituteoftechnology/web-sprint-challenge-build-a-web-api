// Write your "projects" router here!
const express = require("express")
const projects = require("./projects-model")
const {validateProjectID, validateBeforeAddingProject, verifyRequestBody} = require("../middleware/projectsMiddleware")

const router = express.Router()

router.get("/api/projects", async (req, res) => {
    res.send(await projects.get())

})

router.get("/api/projects/:id", validateProjectID(), async (req, res) => {
    res.send(await projects.get(req.project.id))

})

router.get("/api/projects/:id/actions", validateProjectID(), async (req, res) => {
    res.send(await projects.getProjectActions(req.project.id))

})

router.post("/api/projecs", validateBeforeAddingProject(), async (req, res) => {
    try {
        await projects.insert(req.newProject)
        res.send(req.newProject)
    } catch {

    }
})

router.put("/api/projects/:id", validateProjectID(), verifyRequestBody(), (req, res) => {
    projects.update(req.project.id, req.changes)
    .then(res.send(req.changes))
    .catch()
})

router.delete("/api/projects/:id", validateProjectID(), (req, res) => {
    projects.remove(req.project.id)
    .catch(next())
})

module.exports = router