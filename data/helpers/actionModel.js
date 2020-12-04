const db = require('../dbConfig.js');
const mappers = require('./mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
};

function get() {
  return db('actions')
}

function getbyid(id){
  return db("actions").where({ id }).first();
}

function insert(action) {
  return db('actions')
    .insert(action, 'id')
    .then(([id]) => getbyid(id));
}

function update(id, changes) {
  return db('actions')
    .where({ id })
    .update(changes)
    .then((count) => (count > 0 ? getbyid(id) : null));
}

function remove(id) {
  return db("actions").where({ id }).del();
}
