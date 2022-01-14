const Action = require('./actions-model')

// 7
async function theActions(req, res, next) {
  try {
    const action = await Action.get(req.params)
    return action;
  } catch (err) {
    next(err)
  }
}

// 8
async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id)
    if (!action) {
      res.status(404).json({
        message: 'action not found'})
    } else {
      req.action = action
      next()
    }
  } catch (err) {
    next(err)
  }
}

// 9
async function validateAction(req, res, next) {
  try {
    const action = await Action.update(req.params.id, req.params)
    const { project_id, description, notes } = req.body;
    if (!action) {
      res.status(404).json({
        message: 'action not found'})
    } else if (!project_id || !description || !notes) {
      res.status(400).json({
        message: 'missing required project_id, description or notes field'})
    } else {
      req.action = action
      next()
    }
  } catch (err) {
    next(err)
  }
}

// 10
async function updateAction(req, res, next) {
  try {
    const action = await Action.update(req.params.id, req.params)
    const { project_id, description, notes } = req.body;
    if (!action) {
      res.status(404).json({
        message: 'action not found'})
    } else if (!project_id || !description || !notes) {
      res.status(400).json({
        message: 'missing required project_id, description or notes field'})
    } else {
      req.action = action
      next()
    }
  } catch (err) {
    next(err)
  }
}

async function deleteActions(req, res, next) {
  try {
    const action = await Action.remove(req.params.id)
    if (!action) {
      res.status(404).json({
        message: 'action not found'})
    } 
  } catch (err) {
    next(err)
  }
}

module.exports = {
  theActions,
  validateActionId,
  validateAction,
  updateAction,
  deleteActions
}