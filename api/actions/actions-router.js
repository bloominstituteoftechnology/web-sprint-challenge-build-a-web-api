const express = require("express");
const {} = require("./actions-middlware")
const Action = require("./actions-model")

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Hello this is inside actions-router.js");
});

module.exports = router;
