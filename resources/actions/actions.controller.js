const Actions = require('../../data/helpers/actionModel')

const getActions = async (req, res, next) => {
  try {
    const allActions = await Actions.get()
    res.status(200).json(allActions)
  } catch (error) {
    next(error)
  }
}

const getActionsById = async (req, res, next) => {
  const {id} = req.params
  try {
    const allActions = await Actions.get(id)
    res.status(200).json(allActions)
  } catch (error) {
    next(error)
  }
}

const createAction = async (req, res, next) => {
  try {
    const newAction = await Actions.insert(req.body)
    res.status(201).json(newAction)
  } catch (error) {
    next(error)
  }
}

const updateAction = async (req, res, next) => {
  const {id} = req.params
  try {
    await Actions.update(id, req.body)
    res
      .status(200)
      .json({message: `Action with the Id# ${id} has been updated`})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getActions,
  getActionsById,
  createAction,
  updateAction,
}
