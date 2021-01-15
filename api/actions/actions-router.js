const express = require('express');
const Action = require('./actions-model');
const router = express.Router();

// curl http://localhost:5000/api/actions
router.get('/', async (req, res, next) => {
    try {
        const actions = await Action.get();
        res.status(200).json(actions);
    } catch (err) {
        next(err);
    }
});

// router.get('/:id', async (req, res) => {
    // try {

    // } catch (err) {
        
    // }
// });

// router.post('/', async (req, res) => {
    
// });

// router.put('/:id', async (req, res) => {
    
// });

// router.delete('/:id', async (req, res) => {
    
// });

router.use((err, req, res, next) => {
    res.status(500).json({
        info: 'Something went wrong with the router',
        message: err.message,
        stack: err.stack
    });
})

module.exports = router;
