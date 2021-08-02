const { createUser, findAll, findById } = require('./users');
const { createCategory } = require('./categories');

module.exports = {
  createUser,
  findAll,
  findById,
  createCategory,
};