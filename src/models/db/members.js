const db = require('./db')

const createMember = function(member){
  return db.query('INSERT INTO members (username, password) VALUES (${username}, ${password})'
            , member);
}

const findByUsername = function(member) {
  return db.query('SELECT * FROM members WHERE username = $1', member.username)
}

module.exports = {createMember, findByUsername}
