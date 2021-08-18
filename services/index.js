const user = require('./userService');
const login = require('./loginService');
const jwtService = require('./jwtService');
const categories = require('./categoriesService');

module.exports = {
  user,
  login,
  jwtService,
  categories,
};
