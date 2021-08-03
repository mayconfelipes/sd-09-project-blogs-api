const joi = require('joi');
const { Category } = require('../models');
const { messageError } = require('../middwares/errors');

const { BAD_REQUEST_STATUS, INTERNAL_ERROR_STATUS } = require('../middwares/httpStatus');
const { CATEGORY_NOT_CREATED, NAME_REQUIRED } = require('../middwares/errorMessages');

const categorySchema = joi.object({
  name: joi.string().required(),
});

const validateName = (name) => {
  const result = categorySchema.validate(name);

  if (result.error) {
    throw messageError(BAD_REQUEST_STATUS, NAME_REQUIRED);
  }
};

const create = async (name) => {
  const validateCategory = {
    name,
  };

  validateName(validateCategory);

  const newCategory = await Category.create({ name });

  if (!newCategory) {
    throw messageError(INTERNAL_ERROR_STATUS, CATEGORY_NOT_CREATED);
  }

  return newCategory;
};

const getAll = async () => Category.findAll();

const getById = async (id) => Category.findByPk(id);

module.exports = {
  create,
  getAll,
  getById,
};