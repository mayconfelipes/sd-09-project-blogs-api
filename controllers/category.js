const rescue = require('express-rescue');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const { Category } = require('../models');
const { sequelize } = require('../models');

const create = rescue(async (req, res, next) => {
    const { error } = joi.object({
        name: joi.string().required(),
    })
        .validate(req.body);

    if (error) return next(error);

    const { name } = req.body;

    const category = await sequelize.transaction(async (transaction) => (
        Category.create({ name }, { transaction })));

    jwt.sign(category.dataValues, process.env.JWT_SECRET);

    res.status(201).json(category);
});

const read = rescue(async (req, res) => {
    const categories = await Category.findAll();

    res.status(200).json(categories);
});

module.exports = {
    create,
    read,
}; 