const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  completed: Joi.boolean(),
})

module.exports = schema
