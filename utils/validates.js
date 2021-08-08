const validName = (name) => name.length >= 8;

const validEmail = (email) => /\w+@\w+\.\w{2,3}/.test(email);

const validPassword = (password) => password.length >= 6;

module.exports = {
  validName,
  validEmail,
  validPassword,
};