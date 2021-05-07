const express = require("express");
const { validateID, validateAction } = require("../middleware");
const Actions = require("./actions-model");

const router = express.Router();

router.use("/:id", (req, _res, next) => {
  validateID(Actions, "project", req, next);
});

router.get("/", (_req, res, next) => {
  Actions.get()
    .then((actions) => res.status(200).json(actions))
    .catch(next);
});

router.get("/:id", (req, res) => res.status(200).json(req.idResult));

router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((newAction) => res.status(201).json(newAction))
    .catch(next);
});

router.put("/:id", validateAction, (req, res, next) => {
  const id = req.params.id;

  Actions.update(id, req.body)
    .then((updatedAction) => res.status(201).json(updatedAction))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;
