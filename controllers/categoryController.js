const express = require('express');
const rescue = require('express-rescue');
const Joi = require('joi');
const validateJWT = require('../api/auth/validateJWT');
const validate = require('../middlewares/validate');
const { Category } = require('../models');

const router = express.Router();

router.post('/categories', [
  validateJWT,
  validate(Joi.object({
    name: Joi.string().required(),
  })),
  rescue(async (req, res, _next) => {
    const { name } = req.body;
    const category = await Category.create({ name });

    return res.status(201).json(category);
  }),
]);

router.get('/categories', [
  validateJWT,
  rescue(async (_req, res, _next) => {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  }),
]);

module.exports = router;
