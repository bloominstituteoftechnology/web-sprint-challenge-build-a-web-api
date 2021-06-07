const express = require('express');
const { validateAction } = require('../middleware/middleware');

const Actions = require('./actions-model');

const router = express.Router();

router.get('/', (req, res, next) => {
	Actions.get()
		.then(actions => {
			res.status(200).json(actions);
		})
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	Actions.get(req.params.id)
		.then(actions => {
			if (!actions) {
				res.status(404);
				next();
			} else {
				console.log('actions: ', actions);
				res.status(200).json(actions);
			}
		})
		.catch(next);
});

router.post('/', validateAction, (req, res, next) => {
	Actions.insert({
		project_id: req.project_id,
		notes: req.notes,
		description: req.description,
		completed: req.body.completed
	})
		.then(action => {
			res.json(action);
		})
		.catch(next);
});

router.put('/:id', validateAction, (req, res, next) => {
	Actions.get(req.params.id)
		.then(action => {
			if (!action) {
				res.status(404);
				next();
			} else {
				return Actions.update(req.project_id, {
					project_id: req.project_id,
					notes: req.notes,
					description: req.description,
					completed: req.body.completed
				});
			}
		})
		.then(action => {
			console.log('PUT ACTION: ', action);
			res.status(200).json(action);
		})
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	const { id } = req.params;
	Actions.get(id)
		.then(action => {
			if (!action) {
				res.status(404);
				next();
			} else {
				return Actions.remove(id);
			}
		})
		.then(deletedAction => {
			res.status(200).json(deletedAction);
		})
		.catch(next);
});

module.exports = router;
