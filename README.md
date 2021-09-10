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

- [x] Fork and clone this repository. **If you are repeating this Course, delete your old fork from Github and re-fork and re-clone.**
- [x] Create a new branch: `git checkout -b <firstName-lastName>`.
- [x] Implement the project on your newly created branch, committing changes regularly.
- [x] Push commits: `git push origin <firstName-lastName>`.
- [x] **RUN** `npm install` to install your dependencies.

### Task 2: CodeGrade Setup

- [Outdated] Follow [instructions](https://www.notion.so/lambdaschool/Submitting-an-assignment-via-Code-Grade-A-Step-by-Step-Walkthrough-07bd65f5f8364e709ecb5064735ce374) to set up Codegrade's Webhook and Deploy Key, making sure your deployment is set to your `<firstName-lastName>` branch.
- [x] Make a commit and push it to Github.
- [x] Check to see that Codegrade has accepted your git submission.

### Task 3: Project Requirements (MVP)

Your finished project must include all of the following requirements:

#### NPM Scripts

A _"test"_ script already exists you can use to run tests against your code.
A _"resetdb"_ script exists that allows you to reset the database to its original state.

- [x] Write an _npm script_ named _"start"_ that uses `node` to run the API server.
- [x] Write an _npm script_ named _"server"_ that uses `nodemon` to run the API server.
- [x] Install _nodemon_ as a development dependency that would not be used in production.

#### Environment Variables

- [x] Bring the port number from the `process.env` variable, falling back to `5000` if `process.env.PORT` is undefined.

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

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | do not provide it when creating projects, the database will generate it     |
| name        | string    | required                                                                    |
| description | string    | required                                                                    |
| completed   | boolean   | not required, defaults to false when creating projects                      |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | do not provide it when creating actions, the database will generate it                           |
| project_id  | number    | required, must be the id of an existing project                                                  |
| description | string    | required, up to 128 characters long                                                              |
| notes       | string    | required, no size limit. Used to record additional notes or requirements to complete the action  |
| completed   | boolean   | not required, defaults to false when creating actions                                            |

### Database Persistence Helpers

The project includes models you can use to manage the persistence of _project_ and _action_ data. These files are `api/projects/projects-model.js` and `api/actions/actions-model.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Remember to use .then().catch() or async/await.**

- `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projects-model.js` includes an extra method called `getProjectActions()` that takes a _project id_ as its only argument and returns a list of all the _actions_ for the _project_.

We have provided test data for all the resources.

**Notes:**

- Run tests locally executing `npm test`.
- Do not make changes to your `package.json` except to add **additional** dependencies and scripts. Do not update existing packages.
- Use an HTTP client like `HTTPie`, `Postman` or `Insomnia` to manually test the API's endpoints.
- Use Express Routers to organize your endpoints.
- Even though you are only required to write two middleware functions, it is advised that you leverage middlewares as much as possible.
- You are welcome to create additional files for middlewares, but **do not move or rename existing files** or folders.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing including spell-checking and grammar-checking on your work.
- It is better to submit a challenge that meets MVP than one that attempts too much and does not.

## Submission format

- [ ] Submit via Codegrade by pushing commits to your `<firstName-lastName>` branch on Github.
- [ ] Create a pull-request to merge `<firstName-lastName>` branch into main.
- [ ] Check Codegrade for automated feedback.
- [ ] Check Codegrade on Monday following the Sprint Challenge for reviewer feedback.
- [ ] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics. You might prepare by writing down your own answers before hand.

1. The core features of Node.js and Express and why they are useful.

Node.js: <---

  <!-- Seed: mod1obj1 -->
  https://lambdaschool.instructure.com/courses/1594/pages/objective-1-explain-what-node-dot-js-is-and-its-core-features?module_item_id=613008

  -can write Software with JS which you formerly couldn't
  <!-- Node.js gave developers the chance to use JavaScript to write software that, up to that point, could only be written using C, C++, Java, Python, Ruby, C#, and the like. -->
  -use JS for both client and server
  <!-- Uses the same programming language (JavaScript) and paradigm for both client and server. Using the same language, we minimize context switching and make it easy to share code between the client and the server. -->
  -JS is single-threaded i.e. only one stack to execute the program. Stack being an array or list structure of function calls and parameters
  <!-- JavaScript is single-threaded, which removes the complexity involved in handling multiple threads. -->
  -JS is asynchronous == processor fully utilized. Note: node runs on single CPU. Note2: There are ways to engage multiple CPUs.
  <!-- JavaScript is asynchronous, which allows us to take full advantage of the processor it's running on. Taking full advantage of the processor is crucial because the node process will be running on a single CPU. -->
  -can use npm repo
  <!-- Using JavaScript gives us access to the npm repository. This repository is the largest ecosystem of useful libraries (most of them free to use) in npm modules. -->

Express: <---

  <!-- Seed: mod1obj2 -->
  https://lambdaschool.instructure.com/courses/1594/pages/objective-2-explain-what-express-is-and-its-core-features?module_item_id=613010

  Can:
    
    -build web apps
    -serve SPAs aka. single page applications
    -build RESTful (Representational State Transfer) web services that work with JSON
    
    RESTful web service is a lightweight, maintainable, and scalable service that is built on the REST architecture. Restful Web Service, expose API from your application in a secure, uniform, stateless manner to the calling client

    -serve const staticContent = [HTMLfiles, images, audioFiles, PDFs, more]
    -powers apps using Web Sockets or WebRTC

    <!-- Build web applications.
    Serve Single Page Applications (SPAs).
    Build RESTful web services that work with JSON.
    Serve static content, like HTML files, images, audio files, PDFs, and more.
    Power real-time applications using technologies like Web Sockets or WebRTC. -->

  More Benefits:

    const moreBenefits = [simple, unopiniated, extensible, light-weight, 
    middlewareCompatible_meansConnectModulesTapable, packedInIntuitiveAPI, 
    simplifiesTasks_abstractsAwayCommonOnes]

2. Understand and explain the use of Middleware.

-can get (req, res), optionally operate on them, optionally trigger actions. Example: logins. 

<!-- Middleware functions can get the request and response objects, operate on them, and (when specified) trigger some action. Examples are logging or security. -->
<!-- Middleware can change the request or response, but it doesn't have to. -->

3. The basic principles of the REST architectural style.

 <!-- Seed: mod2obj3 -->

 Also see answer at 1. on what express can do.

-Recommendations, not rules
-everything == resource
-unique URL for each

<!-- resources can have multiple representations.
communication happens over a stateless protocol (HTTP).
resource management happens via HTTP methods.  --> e.g. CRUD

<!-- Applying the REST architecture to our APIs can make them scalable and simpler to maintain and extend. -->

4. Understand and explain the use of Express Routers.
 <!-- Seed: mod1obj2, mod2obj1 -->

<!-- We can break up applications into routers. We could have a router to serve our SPA and another router for our API. Each router can have its own middleware and routing. This combination provides improved functionality. -->

-Routing is one of the main functions of express
-A way to map incoming reqs from clients to servers --> to the matching handler function

<!-- A request handler is designed to support client access to the server. Most of the default request handlers are designed around providing REST support for submitting jobs, but any communication method could be supported. This tutorial sets up a webpage for a browser client to use. The browser then uses AJAX to communicate with the server.

Express is a handler function that react to http calls and methods. Express router are used as modules to keep the layers of backend application  organized. -->

I.e. route = specific direction. When user req info at url, I fire set of functions to process req
I.e. can make single URL to use crud on resources, adds only ending
E.g. server.get('/about'...

5. Describe tooling used to manually test the correctness of an API.

-postman
-http pie
-debugger?
-TestRail

<!-- Postman is an interactive and automatic tool for verifying the API.
It works in the backend and makes sure that the is working as expected. 
Postman can create a request and gives the response to make sure that
it contains the element that we want in the API. 
Postman allows us to build, test and modify the API. -->

Using these tools/that syntax in my terminal I can verify that my API works, }else{ why not