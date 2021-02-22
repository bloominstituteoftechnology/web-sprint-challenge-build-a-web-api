// Write your "actions" router here!
const express = require("express")
const actions = require("./actions-model")
const { validateActionsId, validateActionBody } = require("../middleware/middleware")

const router = express.Router()

// #1 [GET] /api/actions` returns an array of actions (or an empty array) as the body of the _response_.
router.get("/api/actions", async (req, res, next) => {
    try {
        const action = await actions.get()
        res.status(200).json(action)
    } catch (err) {
        next(err)
    }
})

// #2 [GET] /api/actions/:id` returns an action with the given `id` as the body of the _response_.
router.get("/api/actions/:id", validateActionsId(), (req, res) => {
    res.json(req.action)
})

// #3 [POST] /api/actions` returns the newly created action as the body of the _response_.
router.post("/api/actions", validateActionsId(), (req, res, next) => {
    actions.insert(req.body)
        .then((action) => {
            res.status(201).json(action)
        })
        .catch(next)
})

// #4 [PUT] /api/actions/:id` returns the updated action as the body of the _response_.
router.put("/api/actions/:id", validateActionsId(), validateActionBody(), async (req, res, next) => {
    try {
        const action = await actions.update(req.params.id, req.body)
        res.status(201).json(action)
    } catch (err) {
        next(err)
    }
})

// #5 [DELETE] /api/actions/:id` returns no _response_ body.
router.delete("/api/actions/:id", validateActionBody(), async (req, res, next) => {
    try {
        await actions.remove(req.params.id)
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

module.exports = router