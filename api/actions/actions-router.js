const express = require("express");
const { validateID, validateAction } = require("../middleware");
const Actions = require("./actions-model");

const router = express.Router();

router.use("/:id", (req, res, next) => {
  validateID(Actions, "project", req, next);
});

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => res.status(200).json(actions))
    .catch(next);
});

router.get("/:id", (req, res, next) => res.status(200).json(req.idResult));

router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((newProject) => res.status(201).json(newProject))
    .catch(next);
});
