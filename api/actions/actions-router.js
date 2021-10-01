const express = require('express');
const Action = require('./actions-model');
const router = express.Router();

const { checkId, validateAction } = require('./actions-middlware');

router.get('/', async (req, res, next) => {
    try {
        const allActions = await Action.get();
        res.status(200).json(allActions);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', checkId, (req, res) => {
    res.status(200).json(req.found);
});

router.post('/', validateAction, async (req, res) => {
    const actionA = await Action.insert(req.body);
    res.status(201).json(actionA);
});

router.put('/:id', checkId, validateAction, async (req, res) => {
    const actionA = await Action.update(req.params.id, req.body);

    res.status(200).json(actionA);
});

router.delete('/:id', checkId, async (req, res) => {
    const actionA = await Action.remove(req.params.id, req.body);

    res.status(200).json(actionA);
});

module.exports = router;
