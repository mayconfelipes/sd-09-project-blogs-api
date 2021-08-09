const jwt = require('jsonwebtoken');
const { BlogPosts, Users } = require('../models');
require('dotenv').config();

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    // const { email } = req.user;
    // const token = req.headers.authorization;

    // console.log(token);

    // if (!token) return res.status(401).json({ message: 'Token not found' });
    // jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findOne({ where: { email: 'lewishamilton@gmail.com' } });
    const userId = user.dataValues.id;

    const post = await BlogPosts.create({ userId, title, content, categoryIds });
    return res.status(201).json(post);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { createPost };