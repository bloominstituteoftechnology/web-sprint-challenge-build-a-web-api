# Sprint Challenge Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **how to build web services based on the REST (REpresentational State Transfer) architectural style**. During this sprint, you studied **Node.js and Express, server side routing, how to write Express middleware and how to deploy an API to Heroku**.

In your challenge this week, you will demonstrate your mastery of these skills by designing and creating a web API to manage the following resources: `Projects` and `Actions`.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers the Monday after challenge submissions. For more information on the review process [click here](https://www.notion.so/lambdaschool/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a).

You are not allowed to collaborate during the sprint challenge.

## Introduction

In meeting the minimum viable product (MVP) specifications listed below, your project should provide an API that has Create, Read, Update and Delete (CRUD) functionality for both `projects` and `actions`.

## Instructions

### Task 1: Project Set Up

- [ ] Run `npm install` to install your dependencies.
- [ ] Run tests locally executing `npm test`.
- [ ] Reset the database to its original state executing `npm run resetdb`.

### Task 2: Project Requirements (MVP)

Your finished project must include all of the following requirements:

#### NPM Scripts

A _"test"_ script already exists you can use to run tests against your code.
A _"resetdb"_ script exists that allows you to reset the database to its original state.

- [ ] Write an _npm script_ named _"start"_ that uses `node` to run the API server.
- [ ] Write an _npm script_ named _"server"_ that uses `nodemon` to run the API server.
- [ ] Install _nodemon_ as a development dependency that would not be used in production.

#### Environment Variables

- [ ] Bring the port number from the `process.env` variable, falling back to `5000` if `process.env.PORT` is undefined **!!!**

#### Endpoints

Inside `api/projects/projects-router.js` build the following endpoints:

- [ ] `[GET] /api/projects`
  - Returns an array of projects as the body of the response.
  - If there are no projects it responds with an empty array.
- [ ] `[GET] /api/projects/:id`
  - Returns a project with the given `id` as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.
- [ ] `[POST] /api/projects`
  - Returns the newly created project as the body of the response.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [ ] `[PUT] /api/projects/:id`
  - Returns the updated project as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [ ] `[DELETE] /api/projects/:id`
  - Returns no response body.
  - If there is no project with the given `id` it responds with a status code 404.
- [ ] `[GET] /api/projects/:id/actions`
  - Returns an array of actions (could be empty) belonging to a project with the given `id`.
  - If there is no project with the given `id` it responds with a status code 404.

Inside `api/actions/actions-router.js` build endpoints for performing CRUD operations on _actions_:

- [ ] `[GET] /api/actions`
  - Returns an array of actions (or an empty array) as the body of the response.
- [ ] `[GET] /api/actions/:id`
  - Returns an action with the given `id` as the body of the response.
  - If there is no action with the given `id` it responds with a status code 404.
- [ ] `[POST] /api/actions`
  - Returns the newly created action as the body of the response.
  - If the request body is missing any of the required fields it responds with a status code 400.
  - When adding an action make sure the `project_id` provided belongs to an existing `project`.
- [ ] `[PUT] /api/actions/:id`
  - Returns the updated action as the body of the response.
  - If there is no action with the given `id` it responds with a status code 404.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [ ] `[DELETE] /api/actions/:id`
  - Returns no response body.
  - If there is no action with the given `id` it responds with a status code 404.

#### Middleware functions

- [ ] Write at least two middleware functions for this API, and consume them in the proper places of your code.

### Database Schemas

The description of the structure and extra information about each _resource_ stored in the included database (`./data/lambda.db3`) is listed below.

#### Projects

| Field       | Data Type | Metadata                                                                |
| ----------- | --------- | ----------------------------------------------------------------------- |
| id          | number    | do not provide it when creating projects, the database will generate it |
| name        | string    | required                                                                |
| description | string    | required                                                                |
| completed   | boolean   | not required, defaults to false when creating projects                  |

#### Actions

| Field       | Data Type | Metadata                                                                                        |
| ----------- | --------- | ----------------------------------------------------------------------------------------------- |
| id          | number    | do not provide it when creating actions, the database will generate it                          |
| project_id  | number    | required, must be the id of an existing project                                                 |
| description | string    | required, up to 128 characters long                                                             |
| notes       | string    | required, no size limit. Used to record additional notes or requirements to complete the action |
| completed   | boolean   | not required, defaults to false when creating actions                                           |

### Database Persistence Helpers

The project includes models you can use to manage the persistence of _project_ and _action_ data. These files are `api/projects/projects-model.js` and `api/actions/actions-model.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Remember to use .then().catch() or async/await.**

- `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projects-model.js` includes an extra method called `getProjectActions()` that takes a _project id_ as its only argument and returns a list of all the _actions_ for the _project_.

We have provided test data for all the resources.

**Important Notes:**

- Do not make changes to your `package.json` except to add **additional** dependencies and scripts. Do not update existing packages.
- Your app must be able to run in Node v.12. Do not use newer features of Node (e.g.: optional chaining and nullish coalescing NOT supported).
- Use an HTTP client like `HTTPie`, `Postman` or `Insomnia` to manually test the API's endpoints.
- Use Express Routers to organize your endpoints.
- Even though you are only required to write two middleware functions, it is advised that you leverage middlewares as much as possible.
- You are welcome to create additional files, but **do not move or rename existing files** or folders.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing including spell-checking and grammar-checking on your work.

## Submission format

- [ ] Submit via Codegrade by pushing commits to your `main` branch.
- [ ] Check Codegrade before the deadline to compare its results against your local tests.
- [ ] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [ ] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics. You might prepare by writing down your own answers before hand.

1. The core features of Node.js and Express and why they are useful.
   `node`: 
   node uses the same progarming language as web browsers, which make it easy to move from serverside to clientside
   node is exrimy fast and it runs on single cpu
   since node gives us acces to npm repository that makes the developer life alot easier 
   `express`: 
   Middleware: function that get req and res and next can preform some kind of task and return the result to client 
   Routing: gives the ability to select what function to excute base on the url and we can use it to break the application to smaller parts
   Helpers: function that are part of express library and give us out of teh box functionality 
   views: gives us ability to render html on server



2. Understand and explain the use of Middleware.

   Middleware: function that get req and res and next can preform some kind of task and return the result to client or it can move to next middleware and do multiple task. one of the awesome functionality of Middleware is that it can change the request


3. The basic principles of the REST architectural style.

REST is a way to guide interaction between computer systems that are connceted to the worldwide web and makinkg them able to communicate in a easier and faster way.

client-server : REST seprate the everything to clinet server side
stateless: meaing server doesn't need to know about the client state and server can be used to get and send information not realy on the previos request

cache : client can send request to server and server response back to the client with whatever they wanted, for exmple if the client wanted to
 get(that thing ) then server knows where to look for (that thing) and it respons back with (that thing)

Rest layer : there can be many layered betweenn the clinet and server, for exmple for secuiryt reasons. 

4. Understand and explain the use of Express Routers.

Express Routers is one of the main features of Express which gives us the ability to select what function to excute base on the url and we can use it to break the application to smaller parts

5. Describe tooling used to manually test the correctness of an API.
   we can test our api using tools like postman that can interact with our api and show us the result.
   we can also use good old trusty console.log to see our result
   or we can use tools like vscode debug to find the connection between the fucntion and endpoints 
