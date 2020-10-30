const express = require("express");
const { route } = require("./actionsRouter");

const Projects = require("./data/helpers/projectModel");

const router = express.Router();

//get all
router.get("/api/projects", (req, res) => {
  Projects.get()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "get all - not working",
      });
    });
});

//get by id
router.get("/api/projects/:id", validID, (req, res) => {
  res.status(200).json(req.project);
});

//post
router.post("/api/projects", validPost, (req, res) => {
  Projects.insert(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "project post - something went wrong lad" });
    });
});

//delete
router.delete("/api/projects/:id", validID, (req, res) => {
  Projects.remove(req.project.id)
    .then((data) => {
      res.status(200).json({ message: "successfully deleted!" });
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "delete - something went wrong with the delete",
        error: err,
      });
    });
});

//edit/put
router.put("/api/projects/:id", [validID, validPost], (req, res) => {
  Projects.update(req.params.id, req.body)
    .then(() => {
      res.status(200).json({ message: "successfully updated user info" });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

//middelware
function validID(req, res, next) {
  Projects.get(req.params.id)
    .then((data) => {
      if (data) {
        req.project = data;
        next();
      } else {
        res
          .status(400)
          .json({ message: "the project with that id does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "validID - not working",
        error: err,
      });
    });
}

function validPost(req, res, next) {
  if (!req.body) {
    res.status(400).json("missing project data");
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json("you're missing the name");
  } else {
    next();
  }
}

module.exports = router;
