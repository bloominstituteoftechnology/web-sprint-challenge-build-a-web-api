const express = require('express')
const { validateAction, validateActionId } = require('./actions-middleware')
const Action = require('../actions/actions-model')

const router = express.Router()

//[GET] api/actions
router.get('/', (req, res, next) => {
    Action.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(next)
})

//[GET] api/actions/:id
router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
  });


//[POST] api/actions
router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
    .then(newAction => {
        res.json(newAction)
    })
    .catch(next)
})

//[PUT] api/actions/:id
router.put('/:id', validateAction, (req, res, next) => {
    Action.update(req.params.id, req.body)
     .then(action => {
       res.status(200).json(action);
     })
     .catch(next)
   });


//[DELETE] api/actions/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Action.get(req.params.id)
        if (!deleted) {
            res.status(404).json({
                message: "The action does not exist"
            })
        } else {
            await Action.remove(req.params.id)
            res.json(deleted)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The action could not be removed',
            err:err
        })
    }

})


module.exports = router