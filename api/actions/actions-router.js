const express = require("express");
const Action = require("./actions-model");
const {
  validateId,
  validateNewAction,
  validateProject,
} = require("./actions-middlware");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const actions = await Action.get();
    res.status(200).json([...actions]);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateId, async (req, res, next) => {
  try {
    res.status(200).json({ ...req.action });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  validateId,
  validateNewAction,
  validateProject,
  async (req, res, next) => {
    try {
      const newAction = await Action.insert(req.newAction);
      res.status(201).json({ ...newAction });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  validateId,
  validateNewAction,
  validateProject,
  async (req, res, next) => {
    try {
      const newAction = await Action.update(req.params.id, req.newAction);
      res.status(201).json({ ...newAction });
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateId, async (req, res, next) => {
  try {
    const numberOfDeletedItem = await Action.remove(req.params.id);
    res.status(201).json(`deleted ${numberOfDeletedItem} action`);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custMessage: "Error Occured retrieving /api/actions path",
    message: err.message,
  });
});

module.exports = router;
