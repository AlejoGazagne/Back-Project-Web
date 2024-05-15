const argon2 = require('argon2');

async function hashPassword(password) {
  try {
    hash = await argon2.hash(password);
    return hash
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function verifyPassword(hash, candidatePassword) {
  try {
    const isValid = await argon2.verify(hash, candidatePassword);
    return isValid;
  } catch (err) {
    // Manejar error
    console.error(err);
  }
}

module.exports = { hashPassword, verifyPassword };