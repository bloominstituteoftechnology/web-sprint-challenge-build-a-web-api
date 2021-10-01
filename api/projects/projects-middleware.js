const Projects=require('./projects-model');

async function validateProjectId(req, res, next) {
    try{
      const project = await Projects.get(req.params.id)
      if(!project){
        res.status(404).json({
          message: "No project can be found with that ID"
        })
      }
      else{
        req.project = project//this saves another trip to the database by tacking on the user to the request object for the next middleware function
        next()
      }
    }
    catch(err){
      res.status(500).json({
        message: "Having trouble accessing the database"
      })
    }
  }

  module.exports = {validateProjectId}
