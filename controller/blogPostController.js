const jwt = require('jsonwebtoken');
const { BlogPosts } = require('../models');
require('dotenv').config();

const createPost = async (req, res) => {
  try {
    const { name } = req.body;
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });
    jwt.verify(token, process.env.JWT_SECRET);

    const response = await BlogPosts.create({ name });
    return res.status(201).json(response);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { createPost };