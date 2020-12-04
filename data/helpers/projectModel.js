const db = require("../dbConfig.js");
const mappers = require("./mappers");

module.exports = {
  get,
  insert,
  update,
  remove,
  getProjectActions,
};

function get(id) {
  return db('projects')
}

function getbyid(id){
  return db("projects").where({ id }).first();
}

function insert(project) {
  try {
    const [id] = await db("projects").insert(project, "id");

    return getbyid(id);
  } catch (error) {
    throw error;
  }
}

function update(id, changes) {
  const count = await db("projects").where({ id }).update(changes)
    if (count) {
      return db('projects').where({ id }).first()
    } else {
      return Promise.resolve(null)
    }
}

function remove(id) {
  const project = await db('projects').where({ id }).first()
    if (!project) return Promise.resolve(null)
    await db("projects").where({ id }).del()
    return Promise.resolve(task)
}

function getProjectActions(projectId) {
  return db("actions as a")
    .join('projects as p', 'a.project_id', 'p.id')
    .select('p.name', 'a.description', 'a.notes')
    .where('p.id', projectId)
}
