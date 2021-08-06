const jwt = require('../auth/jwt');
const validation = require('./validations');
const { Category } = require('../models');

const createCategory = async ({ name, authorization }) => {
  const responseJTW = jwt.verify(authorization);
  if (responseJTW.error) return responseJTW;

  const validResponse = validation.noEmptyValidation({ name }, ['name']);
  if (validResponse.error) return validResponse;

  try {
    const response = await Category.create({ name });
    return response;
  } catch (err) {
    return { error: { message: err.message } };
  }
};

const getCategories = async ({ authorization }) => {
  const responseJTW = jwt.verify(authorization);
  if (responseJTW.error) return responseJTW;

  try {
    const response = await Category.findAll({ raw: true });
    return response;
  } catch (err) {
    return { error: { message: err.message } };
  }
};

module.exports = {
  createCategory,
  getCategories,
};