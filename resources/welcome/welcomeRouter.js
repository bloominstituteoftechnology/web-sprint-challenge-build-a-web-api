const express = require('express')

const router = express.Router()
console.log(process.env.name)
router.get('/', (req, res) => {
  res.send(
    `<div>
    <h2>Welcome To ${process.env.name} </h2>
    <p> API version: ${process.env.npm_package_version}!! </p>
    </div>
    `
  )
})

module.exports = router
