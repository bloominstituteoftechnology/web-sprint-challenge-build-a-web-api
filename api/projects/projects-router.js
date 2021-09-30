const express = require("express");
const {} = require("./projects-middleware")
const Project = require("./projects-model")

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Hello this is inside projects-router.js");
});

module.exports = router;
