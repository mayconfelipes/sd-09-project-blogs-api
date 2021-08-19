const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: 600000,
};

const login = async (req, res) => {
  const { email } = req.body;
  try {
    const exists = await User.findOne({ where: { email } });
    if (!exists) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
      const token = jwt.sign({ data: exists.displayName }, secret, jwtConfig);
      return res.status(200).json({ message: 'Login successful', token });
  } catch (e) {
    return res.status(500).json({ message: 'Internal Error', error: e.message });
  }
};

module.exports = login;