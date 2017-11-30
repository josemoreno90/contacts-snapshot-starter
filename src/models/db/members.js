const db = require('./db')

/**
 * Adds a new member into the members table.
 * @param  {string} member   [description]
 * @param  {string} password [description]
 * @param  {string} salt     [description]
 * @param  {boolean} admin    [description]
 * @return {Promise} - Resolves to ??
 */
const create = function (member, password, salt, admin) {
  const role = admin ? 'admin' : 'regular';
  return db.query('INSERT INTO members (username, password, salt, role) VALUES ($1, $2, $3, $4)', [member, password, salt, role]);
}

/**
 * Find a user given their username
 * @param  {string} username
 * @return {Promise} - Resolves to an array with one anonymous object containing
 *                      keys id, username, password, salt, role
 */
const findByUsername = function (username) {
  return db.query('SELECT * FROM members WHERE username = $1', username)
}

module.exports = { create, findByUsername }
