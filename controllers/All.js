const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateUserFormat } = require('../services/userServices'); 
require('dotenv').config();

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const All = async (req, res) => {
  const { body } = req;
  const { email, name } = body;

  const validate = await validateUserFormat(body);
  if (validate !== true) return res.status(400).json({ message: validate });

  const findEmail = await User.findOne({ where: { email } });
  if (findEmail !== null) {
    return res.status(400).json({ message: 'User already registered' });
  }

  const user = { email, name };

  const token = jwt.sign(
    { data: user },
    process.env.JWT_SECRET,
    jwtConfig,
  );

  await User.create({ ...body });

  res.status(201).json({ message: token });
};

module.exports = All;