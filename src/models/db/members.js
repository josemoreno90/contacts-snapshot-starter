const db = require('./db')

const createMember = function(member){
  return db.query('INSERT INTO members (username, password) VALUES (${username}, ${password})'
            , member);
}

module.exports = {createMember}
