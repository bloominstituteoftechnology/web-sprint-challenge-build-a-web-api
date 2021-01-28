const db = require('../../data/dbConfig.js');
const mappers = require('../../data/helpers/mappers');

module.exports = {
  insertPost,
 
  getActionsdb,
  get,
  insert,
  update,
  remove,
};


function getActionsdb(){
  return db('actions');
}

function get(id) {
  let query = db('actions');

  if (id) {
    return query
      .where('id', id)
      .first()
      .then((action) => {
        if (action) {
          return mappers.actionToBody(action);
        } else {
          return null;
        }
      });
  } else {
    return query.then((actions) => {
      return actions.map((action) => mappers.actionToBody(action));
    });
  }
}

async function getById(id) {
  // return Promise.resolve('getById wired')
  const [post] = await db('actions').where({id});
  return post;
}

async function insertPost(action) {
  
  // return db('actions')
  //   .insert({action}, 'id')
  //   .then(([id]) => get(id));
  const [res] = await db('actions').insert(action);
  const act = await getById(res);
  return act;
}

function insert(action) {
  return db('actions')
    .insert({action}, 'id')
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db('actions')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db('actions').where('id', id).del();
}
