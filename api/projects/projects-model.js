// DO NOT MAKE CHANGES TO THIS FILE
const Project = require("../../data/dbConfig.js");
const mappers = require('../../data/helpers/mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
  getProjectActions,
};

function get(id) {
  let query = Project("projects as p");

  if (id) {
    query.where("p.id", id).first();

    const promises = [query, getProjectActions(id)]; // [ projects, actions ]

    return Promise.all(promises).then(function(results) {
      let [project, actions] = results;

      if (project) {
        project.actions = actions;

        return mappers.projectToBody(project);
      } else {
        return null;
      }
    });
  } else {
    return query.then(projects => {
      return projects.map(project => mappers.projectToBody(project));
    });
  }
}

function insert(project) {
  return Project("projects")
    .insert(project)
    .then(([id]) => get(id));
}

function update(id, changes) {
  return Project("projects")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

function remove(id) {
  return Project("projects")
    .where("id", id)
    .del();
}

function getProjectActions(projectId) {
  return Project("actions")
    .where("project_id", projectId)
    .then(actions => actions.map(action => mappers.actionToBody(action)));
}
