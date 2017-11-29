const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(5);

const hashPassword = password =>
  new Promise(function(resolve, reject) {
    return bcrypt.hash(password, salt, function(err, hash) {
      if(err) return reject(err)
      resolve(hash)
    });
  });

module.exports = { hashPassword }
