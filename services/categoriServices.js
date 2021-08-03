const { Categories } = require('../models');
const validate = require('../middlewares/validateCategories');

const createCategories = async (bodyReq) => {
  const validateCategories = validate(bodyReq);
  if (!validateCategories.message) {
    const result = await Categories.create(bodyReq);
    return result;
  }
  return validateCategories;
};

const getAll = async () => {
  const result = await Categories.findAll();
  return result;
};

module.exports = {
  createCategories,
  getAll,
};