const db = require('./db')

const create = function(member, password){
  return db.query('INSERT INTO members (username, password) VALUES ($1, $2)', [member, password]);
}

const findByUsername = function(username) {
  return db.query('SELECT * FROM members WHERE username = $1', username)
}

module.exports = {create, findByUsername}
