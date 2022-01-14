const Project = require('./projects-model')

// 1
async function theProjects(req, res, next) {
  try {
    const project = await Project.get(req.params.id)
    if (!project) {
      return []
    } else {
      req.project = project
      next()
    }
  } catch (err) {
    next(err)
  }
}

//2
async function validateProjectId(req, res, next) {
  try {
    const project = await Project.get(req.params.id)
    if (!project) {
      res.status(404).json({
        message: 'project not found'})
    } else {
      req.project = project
      next()
    }
  } catch (err) {
    next(err)
  }
}

// 3
async function validateProject(req, res, next) {
  try {
    const project = await Project.get(req.params.id)
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({
        message: 'missing required name field'})
    } else {
      req.project = project
      next()
    }
  } catch (err) {
    next(err)
  }
}

// 4
async function updateProject(req, res, next) {
  try {
    const project = await Project.update(req.params.id)
    const { name, description } = req.body;
    if (!project) {
      res.status(404).json({
        message: 'project not found'})
    } else if (!name || !description) {
      res.status(400).json({
        message: 'missing required name field'})
    } else {
      req.project = project
      next()
    }
  } catch (err) {
    next(err)
  }
}

// 5
async function deleteProjects(req, res, next) {
  try {
    const project = await Project.remove(req.params.id)
    if (!project) {
      res.status(404).json({
        message: 'project not found'})
    } 
  } catch (err) {
    next(err)
  }
}

// 6
async function arrayOfActions(req, res, next) {
  try {
    const project = await Project.getProjectActions(req.params.id)
    if (!project) {
      res.status(404).json({
        message: 'project not found'})
    } else {
      req.project.actions = project
      next()
    }
  } catch (err) {
    next(err)
  }
}