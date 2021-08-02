const error = require('./error');
const { userLogin } = require('./login');
const { jwtValidate } = require('./jwtValidate');

module.exports = {
  error,
  userLogin,
  jwtValidate,
};
