const bcrypt = require('bcrypt');


/**
 * Hashes a given password using bcrypt.
 * @param  {string} password - input
 * @return {Promise} - Resolves to an array that contains the hashed password at 0 and the salt at 1
 */
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(5);
  return new Promise(function(resolve, reject) {
    return bcrypt.hash(password, salt, function(err, hash) {
      if(err) return reject(err)
      resolve([hash, salt]);
    });
  });
}

/**
 * Get the hashed password given a password and salt.
 * @param  {string} password
 * @param  {string} salt
 * @return {Promise} - Resolves to the hashed password
 */
const checkHash = (password, salt) => {
  return new Promise(function(resolve, reject) {
    return bcrypt.hash(password, salt, function(err, hash) {
      if (err) return reject(err)
      resolve(hash);
    });
  });
}

module.exports = { hashPassword, checkHash };
