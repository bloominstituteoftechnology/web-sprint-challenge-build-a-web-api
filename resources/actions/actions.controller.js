const Actions = require('../../data/helpers/actionModel')

/**
 * Show all actions
 *
 * @param
 * @Method GET
 * @route /api/actions
 */
const getActions = async (req, res, next) => {
  try {
    const allActions = await Actions.get()
    res.status(200).json(allActions)
  } catch (error) {
    next(error)
  }
}

/**
 * Get all actions by an ID
 *
 * @param  $ID
 * @Method GET
 * @route /api/actions/ @ID
 */
const getActionsById = async (req, res, next) => {
  const {id} = req.params
  try {
    const allActions = await Actions.get(id)
    res.status(200).json(allActions)
  } catch (error) {
    next(error)
  }
}

/**
 * Create a new action
 *
 * @param
 * @method POST
 * @route /api/actions/
 */
const createAction = async (req, res, next) => {
  try {
    const newAction = await Actions.insert(req.body)
    res.status(201).json(newAction)
  } catch (error) {
    next(error)
  }
}

/**
 * Update an single action by passing an ID
 *
 * @param  $ID
 * @method PUT
 * @route /api/actions/ @ID
 */
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

/**
 * Delete an single  action by passing an ID
 *
 * @param  $id
 * @method DELETE
 * @route /api/actions/ @ID
 */
const deleteAction = async (req, res, next) => {
  const {id} = req.params
  try {
    await Actions.remove(id)
    res.status(200).json({
      message: `Action with the Id# ${id} has been removed`,
      text: req.body.text,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getActions,
  getActionsById,
  createAction,
  updateAction,
  deleteAction,
}
