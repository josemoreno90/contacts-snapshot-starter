const db = require('./db')

const create = function(member, password, salt){
  return db.query('INSERT INTO members (username, password, salt) VALUES ($1, $2, $3)', [member, password, salt]);
}

const findByUsername = function(username) {
  return db.query('SELECT * FROM members WHERE username = $1', username)
}

module.exports = {create, findByUsername}
