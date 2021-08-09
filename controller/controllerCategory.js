const jwt = require('jsonwebtoken');
const { Categories } = require('../models');
require('dotenv').config();

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const token = req.headers.authorization;

    console.log(token);

    if (!token) return res.status(401).json({ message: 'Token not found' });
    jwt.verify(token, process.env.JWT_SECRET);
    
    const response = await Categories.create({ name });
    console.log(response);
    return res.status(201).json(response.name);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { createCategory };