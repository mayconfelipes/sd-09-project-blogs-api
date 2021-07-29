const jwt = require('jsonwebtoken');
const models = require('../models');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const model = await models.Users.findOne({ where: { email, password } });
    if (!model) return res.status(400).json({ message: 'Invalid fields' });
    if (model.password !== password) {
      return res.status(401).json({ message: 'Invalid fields' });
    }
    const token = jwt.sign({ data: model }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/*
const login = async (req, res) => {
  const { token } = req;
  res.status(200).json({ token });
};
*/

module.exports = {
  login,
};