const Actions = require('../actions/actions-model.js');

function checkId(req, res, next) {
  console.log('middleware checking id',res)

  try {
    const actions =  Actions.get(req.params.project_id)
    if (actions) {
      req.actions = actions
      next()
    } else {
      res.status(404).json(`hub with id ${req.params.project_id} not found`)
    }
  } catch (error) {
    res.status(500).json('500 checkId midware ',error)
  }
  // inside middlewares we have access to req and res objects
  // here we can query db, modify request, validate request...

  // after we are done we make a choice:
  //  - allow the request to proceed to the next middleware
  //  - or send a response to the client
}

function validatePost(req, res, next) {
    // do your magic!
    const  project_id = req.body
    try{
      console.log('inside validatepost',req.body)
  
      if (res.body !== undefined){
        next();
      } else{
        res.status(400).json({
          message: "ValidatePost 400 missing required fields"+res.body
        })
      }
    } catch(er){
      res.status(500).json({ message: "missing post data",er })
    }
  }


function checkNew(req, res, next) {
    console.log('middleware checking new ',req)
    // res.set('actions', 'true')
  // check that req body has correct shape
  // if req.body legit, proceed
  // otherwise send back a 400 error
  const  project_id  = req.body;
  try{
    if (project_id) {
        next();
      } else {
        res.status(400).json({ error: "please provide actionname 400 midware checkNew " });
      }
  } catch(er){
      res.status(500).json({message:"missing checknew 500 midwar"})
  }
}

module.exports = { checkId, checkNew, validatePost }
