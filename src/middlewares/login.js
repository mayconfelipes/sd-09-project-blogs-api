require('dotenv').config();
const rescue = require('express-rescue');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const validate = require('./validate');
const { User } = require('../models');

const { JWT_SECRET } = process.env;
const jwtConfig = { expiresIn: '3h', algorithm: 'HS256' };

const userLogin = [
  validate(Joi.object({
    email: Joi.string().not().empty().required(),
    password: Joi.string().not().empty().required(),
  })),
  rescue(async (req, res) => {
    const { email: loginEmail, password: loginPassword } = req.body;

    const user = await User.findOne({ where: { email: loginEmail } });
    
    if (!user || user.password !== loginPassword) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    if (user.email === loginEmail && user.password === loginPassword) {
      const { password: _, ...userWithoutPassword } = user;
      const token = jwt.sign(userWithoutPassword, JWT_SECRET, jwtConfig);
      return res.status(200).json({ token });
    }
  }),
];

module.exports = {
  userLogin,
};