const rescue = require('express-rescue');
const Joi = require('joi');
const generateToken = require('../utils/generateTokenJwt');
const validate = require('./validate');
const { User } = require('../models');

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
      const token = generateToken(user);
      return res.status(200).json({ token });
    }
  }),
];

module.exports = {
  userLogin,
};