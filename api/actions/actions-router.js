const express= require('express');
const Actions = require ('./actions-model.js');
const router = express.Router();
const mw = require('../middleware/middleware.js')

router.get('/api/actions', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    } catch (err) {
        res.status(500).json({ Error: {err} });
    }
});

router.get('/api/actions/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const action = await Actions.get(id);
        if (!action) {
            res.status(404).json({ message: "The action with the specified id does not exist" });
        } else {
        res.status(200).json(action);
        }
    } catch (err) {
        res.status(500).json({ Error: {err} });
    }
});


router.post('/api/actions', async (req, res) => {
    const body = req.body;
    if (!body.project_id || !body.description || !body.notes) {
        res.status(400).json({ message: "please fill in all required fields" });
    } else {
    try {
        const newAction = await Actions.insert(body);
        res.status(201).json(newAction);
    } catch (err) {
        res.status(500).json({ Error: {err} });
    }
}
});

router.delete('/api/actions/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deletedAction = await Actions.remove(id);
        if (!deletedAction) {
            res.status(404).json({ message: "The action with the specified id does not exist" });
        } else {
            res.status(200).json(deletedAction);
        }
    } catch (err) {
        res.status(500).json({ Error: {err} });
    }
});

router.put('/api/actions/:id', async (req, res) => {
    const {id} = req.params;
    const body = req.body;

    if (!body.description && !body.notes) {
        res.status(400).json({ message: "please fill in all the required fields" });
    } else {
        try {
            const updatedAction = await Actions.update(id, body);
            if (!updatedAction) {
                res.status(404).json({ message: "The action with the specified id does not exist"});
            } else {
                res.status(200).json(updatedAction);
            }
        } catch (err) {
            res.status(500).json({ Error: {err} });
        }
    };
});


router.use((err,req,res,next) => {
    res.status(500).json({
        message:"something blew up",
        error:err.message
})})
module.exports = router;
