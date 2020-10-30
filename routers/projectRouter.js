const express = require('express');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const router = express.Router()

router.post('/', (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "error adding project, please try again while whispering sweet nothings to the computer"
      })
    })
})

router.post('/:id/actions', (req, res) => {
  req.body.project_id = req.params.id
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "error adding action, please try again while whispering sweet nothings to the computer"
      })
    })
})

router.get('/', (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error retrieving projects, please contact someone important"
      });
    });
});

router.get('/:id', (req, res) => {
  Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "project not found"})
    });
});

router.get('/:id/actions', (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "project actions not found"})
    });
});

//move to actions
//WHY IS THIS RETURNING NULL ON SUCCESS???
router.get('/actions', (req, res) => {
  Actions.get()
    .then(actions => {
      //for some reason, this isn't being triggered, though it works just fine in the next router.get below
      console.log("Test:", actions)
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "actions actions not found"})
    });
});

//move to actions
router.get('/actions/:id', (req, res) => {
  Actions.get(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "actions actions not found"})
    });
});

router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: "the project been erased from history"})
    } else {
      res.status(404).json({message: "the project couldn't be found"})
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      message: "error removing project"
    })
  })
})

//move to actions
router.delete('/actions/:id', (req, res) => {
  Actions.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: "the actions been erased from history"})
    } else {
      res.status(404).json({message: "the actions couldn't be found"})
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      message: "error removing actions"
    })
  })
})

router.put('/:id', (req, res) => {
  Projects.update(req.params.id, req.body)
  .then(project => {
      res.status(200).json(project)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      message: "error updating project"
    })
  })
});

//move to actions
router.put('/actions/:id', (req, res) => {
  Actions.update(req.params.id, req.body)
  .then(actions => {
      res.status(200).json(actions)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      message: "error updating actions"
    })
  })
});

module.exports = router;