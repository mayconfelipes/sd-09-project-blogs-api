const Joi = require('joi');

const { Category } = require('../models');
const { InvalidArgumentError } = require('../errors');

const CategorySchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  async create(payload) {
    const { error } = CategorySchema.validate(payload);

    if (error) throw new InvalidArgumentError(error.message);

    const category = await Category.create(payload);
    return category;
  },
};