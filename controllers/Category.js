const rescue = require('express-rescue');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const { Category } = require('../models');

const { sequelize } = require('../models');

const setNew = rescue(async (req, res, next) => {
    const { error } = joi.object({
        name: joi.string().required(),
    }).validate(req.body);
      
    if (error) return next(error);

    const { name } = req.body;

    const createdCategory = await sequelize.transaction(async (transaction) => (
      Category.create({ name }, { transaction })));

    jwt.sign(createdCategory.name, process.env.JWT_SECRET);

    res.status(StatusCodes.CREATED).json(createdCategory);
});

const getAll = rescue(async (_req, res) => {
  const categories = await Category.findAll();

  res.status(StatusCodes.OK).json(categories);
});

module.exports = {
  setNew,
  getAll,
};
