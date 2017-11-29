const bcrypt = require('bcrypt');



const hashPassword = password => {
const salt = bcrypt.genSaltSync(5);
const hashAndSalt = [];
  return new Promise(function(resolve, reject) {
    return bcrypt.hash(password, salt, function(err, hash) {
      if(err) return reject(err)
      hashAndSalt.push(hash);
      hashAndSalt.push(salt);
      resolve(hashAndSalt);
    });

  });
}

const checkHash = (password, salt) => {
  return new Promise(function(resolve, reject) {
    return bcrypt.hash(password, salt, function(err, hash) {
      if (err) return reject(err)
      resolve(hash);
    });
  });
}

module.exports = { hashPassword, checkHash }
