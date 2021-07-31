const Joi = require('joi');
const rescue = require('express-rescue');
const { validate } = require('../middlewares');

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const create = [
  validate(categorySchema),
  rescue(async (req, res) => {
    const categoryInfo = req.body;

    return res.status(201).json(categoryInfo);
  }),
];

module.exports = {
  create,
};
