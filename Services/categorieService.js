const Schema = require('../Utils/schemas');
const ValidateError = require('../Utils/schemas');

const addCategory = (category, token) => {
  const { error } = Schema.category.validate(category);
  if (error) throw ValidateError(400, error.message);

  if (!token) throw ValidateError(401, 'Expired invalid token');
  return true;
};

module.exports = addCategory;