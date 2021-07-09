const Action = require('./actions-model')

// middleware to get project id from projects database
async function validateActionId (req, res, next) {
    console.log("Action middleware connected")
    try {
        const action = await Action.get(req.params.id)
        if (!action) {
            res.status(404).json({message: "action not found"})
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "issue finding action"
        })
    }
    // } catch (err) {
    //     next(err)
    // }
}
module.exports = {
    validateActionId,
}