const express = require("express");
const actionModel = require("./data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  actionModel
    .get(req.id)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "error getting actions" });
    });
});
router.get("/:id", (req, res) => {
  actionModel
    .get(req.params.id)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "error getting actions" });
    });
});

router.post("/", (req, res) => {
  const actionInfo = req.body;
  actionModel
    .insert(actionInfo)
    .then((action) => {
      res.status(201).json([{ message: "new action crated" }, action]);
    })
    .catch((error) => {
      res.status(500).json({ error, error: "error duration action creation" });
    });
});

router.put("/:id", (req, res) => {
  const actionInfoChange = req.body;
  const { id } = req.params;
  actionModel
    .update(id, actionInfoChange)
    .then((action) => {
      if (action) {
        res.status(300).json([{ message: "action updated" }, action]);
      } else {
        res.status(404).json({ message: "action not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "error updatin action" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  actionModel.remove(id).then((action) => {
    if (action > 0) {
      res.status(200).json([{ message: "action deleted" }, action]);
    }
  });
});

module.exports = router;
