const express = require('express');
const jwt = require('jsonwebtoken');
const { Category } = require('../models');

const router = express.Router();

const httpStatusCode200 = 200;
const httpStatusCode201 = 201;
const httpStatusCode401 = 401;
const httpStatusCode400 = 400;

router.get('/', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;

  if (!token) return res.status(httpStatusCode401).json({ message: 'Token not found' });

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) return res.status(httpStatusCode401).json({ message: 'Expired or invalid token' });
    const category = await Category.findAll();
    return res.status(httpStatusCode200).json(category);
  });
});

router.post('/', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;

  if (!token) return res.status(httpStatusCode401).json({ message: 'Token not found' });

  const { name } = req.body;

  if (!name) return res.status(httpStatusCode400).json({ message: '"name" is required' });

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) return res.status(httpStatusCode401).json({ message: 'Expired or invalid token' });
    const category = await Category.create({ name });
    return res.status(httpStatusCode201).json(category);
  });
});

module.exports = router;
