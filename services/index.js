const user = require('./userService');
const login = require('./loginService');
const jwtService = require('./jwtService');
const categories = require('./categoriesService');
const post = require('./postService');

module.exports = {
  user,
  login,
  jwtService,
  categories,
  post,
};
