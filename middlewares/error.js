const validadeError = (error, req, res, next) => {
  console.log(error)
  return res.status(500).json({
    message: 'Something went wrong, please try again later',
  })
}

module.exports = validadeError
