/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/

const express = require('express');

const Projects = require('./data/helpers/projectModel');

const Actions = require("./data/helpers/actionModel")

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

server.get('/api/projects', (req, res) => {
  Projects.get(req.query)
  .then(projects => {
    res.status(200).json(projects);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving projects',
    });
  });
});


server.post('/api/projects', (req, res) => {
    Projects.insert(req.body)
    .then(projects => {
      res.status(201).json(projects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding project',
      });
    });
  });

  server.put('/api/projects/:id', (req, res) => {
    const changes = req.body;
    Projects.update(req.params.id, changes)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'The project was not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Its perfect the way it is we wont be changing it',
      });
    });
  });

  server.delete('/api/projects/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'We got rid of the project' });
      } else {
        res.status(404).json({ message: 'Its hiding from us' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'The project is too powerful',
      });
    });
  });

//aksndogkjfcawnojegnceawojkvnoawejkfnoawjn
////apsngfopaskngorajknopskgnapknlwrkna
//a9sidnfoaidwnogrvjnaeojdvnoeakrnvokaen

server.get('/api/actions', (req, res) => {
    Actions.get(req.query)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving actions',
      });
    });
  });


  server.post('/api/actions', (req, res) => {
    Actions.insert(req.body)
    .then(actions => {
      res.status(201).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding action',
      });
    });
  });

  server.put('/api/actions/:id', (req, res) => {
    const changes = req.body;
    Actions.update(req.params.id, changes)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'The action was not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Its perfect the way it is we wont be changing it',
      });
    });
  });

  server.delete('/api/actions/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'We got rid of the action' });
      } else {
        res.status(404).json({ message: 'Its hiding from us' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'The action is too powerful',
      });
    });
  });

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});