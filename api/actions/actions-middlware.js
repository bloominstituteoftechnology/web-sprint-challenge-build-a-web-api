const Actions = require('./actions-model');

async function validateActionsId(req, res, next) {
    try{
      const action = await Actions.get(req.params.id)
      if(!action){
        res.status(404).json({
          message: "No action can be found with that ID"
        })
      }
      else{
        req.actions = action//this saves another trip to the database by tacking on the user to the request object for the next middleware function
        next()
      }
    }
    catch(err){
      res.status(500).json({
        message: "Having trouble accessing the database"
      })
    }
  }


module.exports = {validateActionsId}
