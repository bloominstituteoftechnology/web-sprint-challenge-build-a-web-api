// Write your "actions" router here!
const express = require("express")
const actionsModel = require("./actions-model")
const { actionsId, validateActions } = require("../middleware/middleware")

const router = express.Router()

// #1 [GET] /api/actions` returns an array of actions (or an empty array) as the body of the _response_.
router.get("/api/actions", async (req, res, next) => {
	try {
		const data = await actionsModel.find()
		res.status(200).json(data)
	} catch (err) {
		next(err)
	}
})

// #2 [GET] /api/actions/:id` returns an action with the given `id` as the body of the _response_.
router.get("/api/actions/:id", actionsId(), async (req, res, next) => {
	try {
		const data = await actionsModel.find()
		res.status(200).json(data)
	} catch (err) {
		next(err)
	}
})

// #3 [POST] /api/actions` returns the newly created action as the body of the _response_.
router.post("/api/actions", async (req, res, next) => {
	try {
		const data = await actionsModel.add(req.body)
		res.status(201).json(data)
	} catch (err) {
		next(err)
    }
})

// #4 [PUT] /api/actions/:id` returns the updated action as the body of the _response_.
router.put("/api/actions/:id", validateActions(), async (req, res, next) => {
    try {
		const data = await actionsModel.update(req.body)
		res.status(201).json(data)
	} catch (err) {
		next(err)
	}
})

// #5 [DELETE] /api/actions/:id` returns no _response_ body.
router.delete("/api/actions/:id", async (req, res, next) => {
	try {
		await actionsModel.remove(req.params.id) //should it be action? or actions? instead of actionsModel
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})

module.exports = router