// 👉 You can run tests with `npm test`
// DO NOT CHANGE THIS FILE!
const request = require('supertest')
const db = require('./data/dbConfig')
const Action = require('./data/helpers/actionModel')
const Project = require('./data/helpers/projectModel')
const server = require('./api/server.js')

const projectA = {
  name: 'a', description: 'b', completed: false,
}
const projectB = {
  name: 'c', description: 'd', completed: true,
}
const actionA = {
  project_id: 1, description: 'x', notes: 'y', completed: false,
}
const actionB = {
  project_id: 1, description: 'u', notes: 'v', completed: true,
}
const actions = [actionA, actionB]

beforeAll(async () => {
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('actions').truncate()
  await db('projects').truncate()
  await Project.insert(projectA)
  await Project.insert(projectB)
  await Action.insert(actionA)
  await Action.insert(actionB)
})

describe('server', () => {
  describe('actions endpoints', () => {
    describe('[GET] all', () => {
      it('works', async () => {
        const res = await request(server).get('/api/actions')
        expect(res.body).toHaveLength(2)
        expect(res.body[0]).toMatchObject(actionA)
        expect(res.body[1]).toMatchObject(actionB)
      })
    })
    describe('[GET] by action id', async () => {
      it('works', async () => {
        const res1 = await request(server).get('/api/actions/1')
        const res2 = await request(server).get('/api/actions/2')
        expect(res1.body).toMatchObject(actionA)
        expect(res2.body).toMatchObject(actionB)
      })
    })
    describe('[GET] by project id', () => {
      it('works', async () => {
        const res1 = await request(server).get('/api/projects/1/actions')
        const res2 = await request(server).get('/api/projects/2/actions')
        expect(res1.body).toMatchObject(actions)
        expect(res2.body).toMatchObject([])
      })
    })
    describe('[POST]', () => {
      it('responds with the newly created action', async () => {
        const actionNew = { project_id: 2, description: 'm', notes: 'n', completed: false }
        const res = await request(server).post('/api/actions').send(actionNew)
        expect(res.body).toMatchObject(actionNew)
      })
      it('inserts a new action into actions table', async () => {
        const actionNew = { project_id: 2, description: 'm', notes: 'n', completed: false }
        await request(server).post('/api/actions').send(actionNew)
        const action = await Action.get(3)
        expect(action).toMatchObject(actionNew)
      })
    })
    describe('[PUT]', () => {
      it('responds with the updated action', async () => {
        const action = await Action.get(1)
        const changes = { ...action, completed: true }
        expect(action.completed).toBe(false)
        const res = await request(server).put('/api/actions/1').send(changes)
        expect(res.body).toMatchObject(changes)
      })
      it('updates the action in the actions table', async () => {
        let action = await Action.get(1)
        await request(server).put('/api/actions/1').send({ ...action, completed: true })
        action = await Action.get(1)
        expect(action.completed).toBe(true)
      })
    })
    describe('[DELETE]', () => {
      it('works', async () => {
        await request(server).delete('/api/actions/1')
        let actions = await Action.get()
        expect(actions).toMatchObject([actionB])
        await request(server).delete('/api/actions/2')
        actions = await Action.get()
        expect(actions).toMatchObject([])
      })
    })
  })
  describe('projects endpoints', () => {
    describe('[GET] all', () => {
      it('works', async () => {
        const res = await request(server).get('/api/projects')
        expect(res.body).toHaveLength(2)
        expect(res.body[0]).toMatchObject(projectA)
        expect(res.body[1]).toMatchObject(projectB)
      })
    })
    describe('[GET] by project id', () => {
      it('works', async () => {
        const res1 = await request(server).get('/api/projects/1')
        const res2 = await request(server).get('/api/projects/2')
        expect(res1.body).toMatchObject(projectA)
        expect(res2.body).toMatchObject(projectB)
      })
    })
    describe('[POST]', () => {
      it('responds with the newly created project', async () => {
        const projectNew = { name: 'e', description: 'f', completed: true }
        const res = await request(server).post('/api/projects').send(projectNew)
        expect(res.body).toMatchObject(projectNew)
      })
      it('inserts a new project into projects table', async () => {
        const projectNew = { name: 'e', description: 'f', completed: true }
        await request(server).post('/api/projects').send(projectNew)
        const project = await Project.get(3)
        expect(project).toMatchObject(projectNew)
      })
    })
    describe('[PUT]', () => {
      it('responds with the updated project', async () => {
        const changes = { ...projectA, completed: true }
        const res = await request(server).put('/api/projects/1').send(changes)
        expect(res.body).toMatchObject(changes)
      })
      it('updates the project in the projects table', async () => {
        const changes = { ...projectA, completed: true }
        await request(server).put('/api/projects/1').send(changes)
        const project = await Project.get(1)
        expect(project.completed).toBe(true)
      })
    })
    describe('[DELETE]', () => {
      it('works', async () => {
        await request(server).delete('/api/projects/1')
        let res = await Project.get()
        expect(res).toMatchObject([projectB])
        await request(server).delete('/api/projects/2')
        res = await Project.get()
        expect(res).toMatchObject([])
      })
    })
  })
})
