// Write your "actions" router here!
const express = require("express")
const actions = require("./actions-model")
const {validateActionID, validateBeforeAddingAction, verifyRequestBody} = require("../middleware/actionsMiddeware")

const router = express.Router()

router.get("/api/actions", async (req, res) => {
    res.send(await actions.get())
})

router.get("/api/actions/:id", validateActionID(), (req, res) => {
    res.send(req.action.id)
})

router.post("/api/actions", validateBeforeAddingAction(), async (req, res) => {
    try {
        await actions.insert(req.newAction)
        res.status(200).json({message: `${req.newAction}`})
    } catch {

    }
})

router.put("/api/actions/:id", validateActionID(), verifyRequestBody(), async (req, res) => {
    try {
        await actions.update(req.action.id, req.changes)
        res.status(202).send(req.changes)
    } catch {

    }
})

router.delete("/api/actions/:id", validateActionID(), async (req, res) => {
    await actions.remove(req.action.id)

})

module.exports = router