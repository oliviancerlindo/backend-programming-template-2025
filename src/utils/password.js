const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 16;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });

  return hashedPassword;
}


 @param {string} password - A plain text password
 @param {string} hashedPassword - A hashed password
 @returns {boolean}
 
async function passwordMatched(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
  hashPassword,
  passwordMatched,
};
