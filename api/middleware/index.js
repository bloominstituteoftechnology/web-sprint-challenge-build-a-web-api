const Actions = require('../actions/actions-model.js');

function checkId(req, res, next) {
  console.log('middleware checking id',res)
  res.set('X-Middleware-Header', 'true')
  try {
    const actions =  Actions.get(req.params.id)
    if (hub) {
      req.actions = actions
      next()
    } else {
      res.status(404).json(`hub with id ${req.params.id} not found`)
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

function checkNew(req, res, next) {
  // check that req body has correct shape
  // if req.body legit, proceed
  // otherwise send back a 400 error
  const { name } = req.body;
  if (name) {
    next();
  } else {
    res.status(400).json({ error: "please provide actionname 400 midware checkNew " });
  }
}

module.exports = { checkId, checkNew }
