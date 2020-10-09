const Joi = require('joi')

const schema = Joi.object({
  project_id: Joi.number().required(),
  description: Joi.string().required(),
  notes: Joi.string().required(),
  completed: Joi.boolean().required(),
})

module.exports = schema
