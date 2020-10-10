const Joi = require('joi')

const schema = Joi.object({
  project_id: Joi.number().required(),
  description: Joi.string().max(128).required(),
  notes: Joi.string().required(),
  completed: Joi.boolean(),
})

module.exports = schema
