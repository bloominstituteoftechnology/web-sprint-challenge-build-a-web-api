

const express = require('express');

const Actions = require('./actions-model');
const mw = require('../middleware/middleware');

const router = express.Router();


router.get('/', (req, res) => {
	Actions.get()
		.then(data => res.status(200).json(data))
		.catch(() => mw.serverError);

});


router.get('/:id', (req, res) => {
	const { id } = req.params;
	
	Actions.get(id)
		.then((data) => {
			if (!data) {
				res.status(404).json({message: "Action not found. Please provide a valid id." })
			} else {
				res.status(200).json(data)
			}
		})
		.catch(() => mw.serverError);

});


router.post('/', mw.validateActionData, mw.validateProjectIdForAction, (req, res) => {
	Actions.insert(req.body)
		.then((data) => res.status(201).json(data))
		.catch(() => mw.serverError);
});


router.put('/:id', mw.validateActionData, mw.validateActionId, (req, res) => {
	const { id } = req.params;
	
	Actions.update(id, req.body)
		.then((data) => res.status(200).json(data))
		.catch(() => mw.serverError);
});


router.delete('/:id', mw.validateActionId, (req, res) => {
	const { id } = req.params;

	Actions.remove(id)
		.then((data) => res.status(200).json(data))
		.catch(() => mw.serverError);
});


module.exports = router;