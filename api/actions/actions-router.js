// Write your "actions" router here!
const Actions = require("./actions-model")
const express = require("express")
const router = express.Router()
const {validateActionId, validateAction} = require("./actions-middlware")

router.get('/', async (req, res) => {
    try{
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch(err) {
        next(err)
    }
})

router.get("/:id", validateActionId, async (req, res, next) => {
    try{
        res.status(200).json(req.action)
    } catch(err){
        next(err)
    }
})

router.post("/", async (req, res) => {
    try{
        const newAction = await Actions.insert(req.body)
        console.log(newAction)
        res.status(201).json(newAction)
    } catch{
        next(err)
    }
})

router.put("/:id", validateActionId, validateAction, async (req, res,) => {
    console.log(req.params.id)
    const updatedAction = await Actions.update(req.params.id, {
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed
        })
    res.status(200).json(updatedAction)
})

router.delete("/:id", validateActionId, async (req, res, next) => {
    try{
        await Actions.remove(req.params.id)
        res.json(res.Action)
    } catch(err){
        next(err)
    }
})

module.exports = router 