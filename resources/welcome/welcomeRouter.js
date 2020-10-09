const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send(`<h2>Welcome To Bruno's API 1.0!!</h2>`)
})

module.exports = router
