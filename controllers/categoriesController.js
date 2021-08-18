require('dotenv').config();
const express = require('express');

const router = express.Router();

const services = require('../services');
const { Categories } = require('../models');

router.post('/', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const validate = await services.categories.validateCategorie(req.body);
  console.log(validate);
  if (validate.isJoi) {
    return res.status(400).json({
      message: validate.details[0].message,
    });
  }

  const jwtValidation = await services.jwtService.jwtValidate(token);
  if (jwtValidation.message) {
    return res.status(401).json({ message: jwtValidation.message });
  }

  const newCategorie = await Categories.create(validate);
  return res.status(201).json(newCategorie);
});

module.exports = router;
