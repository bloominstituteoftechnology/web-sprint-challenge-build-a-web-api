const express = require("express");
const projectModel = require("./data/helpers/projectModel");

const router = express.Router();

//Create
router.post("/", (req, res) => {
  const projectInfo = req.body;
  projectModel.insert(projectInfo).then((project) => {
    res.status(201).json([{ message: "project created" }, project]);
  });
});

//Read
router.get("/", (req, res) => {
  projectModel
    .get(req.id)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "err " });
    });
});
router.get("/:id", (req, res) => {
  projectModel
    .get(req.params.id)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "err getting show " });
    });
});

//retrieve all projects
router.get("/:id/projects", (req, res) => {
  projectModel
    .getProjectActions(req.params.id)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "error, couldn't retrieve prjects" });
    });
});

//Update
router.put("/:id", (req, res) => {
  const projectInfo = req.body;
  const { id } = req.params;
  projectModel
    .update(id, projectInfo)
    .then((project) => {
      if (project) {
        res.status(200).json([{ message: "project updated" }, project]);
      } else {
        res.status(404).json({ message: "project wasn't updated" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "There was an error updating the show" });
    });
});

//Delete
router.delete("/:id", (req, res) => {
  projectModel
    .remove(req.params.id)
    .then((project) => {
      if (project > 0) {
        res.status(200).json({ message: `"project", ${project}, "deleted"` });
      } else {
        res.status(404).json({ message: "project not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "error" });
    });
});

module.exports = router;
