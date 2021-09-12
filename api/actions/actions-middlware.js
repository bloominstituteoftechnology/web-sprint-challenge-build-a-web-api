// add middlewares here related to actions

const Actions = require('./actions-model')

const validateActionsId = async (req,res,next) => {
    const {id} = req.params
    // or const id = req.params.id
        const actionId = await Actions.get(id)
        if (!actionId) {
            res.status(404).json({
                message: `action ${id} not found`,
              })
        } else {
            req.actionId = actionId
            next()
        }
}

const validateAction =  (req,res,next) => {
    const { description, notes} = req.body
        if (!description || !notes) {
                res.status(400).json({
                    message: "missing required notes or description"

                })
        } else {
        next()
        }
}

module.exports = {
    validateActionsId,
    validateAction,
}
