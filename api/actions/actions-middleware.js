// add middlewares here related to actions
const yup = require('yup')
const Action = require('./actions-model')


const actionsSchema = yup.object().shape({
    project_id: yup
        .number()
        .required('must be an id of an existing project'),

    description: yup
        .string()
        .required('description is required')
        .max(128, "description should be no longer than 128 chars")
        .trim(),

    notes: yup
        .string()
        .required('notes are required')
})

async function validateAction(req, res, next) {
    try {
        const validated = await actionsSchema.validate(req.body)
        req.body = validated
        next()
    } catch(err) {
        next({status: 400 , message: err.message})
    }
}

module.exports = {
    validateAction

}
