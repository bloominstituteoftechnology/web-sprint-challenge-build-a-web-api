const express = require("express");
const Action = require("./actions-model");
const { checkDatabase, validateAction } = require("./actions-middleware");

// Write your "actions" router here!
const router = express.Router();

router.use("/:id", checkDatabase);

// [GET]
router.get("/", (req, res, next) => {
	Action.get()
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((err) => next(err));
});

router.get("/:id", (req, res) => {
	res.status(200).json(req.action);
});

// [POST]
router.post("/", validateAction, (req, res, next) => {
	Action.insert(req.body)
		.then((action) => {
			res.status(201).json(action);
		})
		.catch((err) => next(err));
});

// [PUT]
router.put("/:id", validateAction, (req, res, next) => {
	Action.update(req.params.id, req.body)
		.then((updatedAction) => {
			res.status(200).json(updatedAction);
		})
		.catch((err) => next(err));
});

// [DELETE]
router.delete("/:id", (req, res, next) => {
	Action.remove(req.params.id)
		.then(() => {
			res.status(200).json({ message: "Action deleted" });
		})
		.catch((err) => next(err));
});

module.exports = router;
