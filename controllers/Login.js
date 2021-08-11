const joi = require('joi');
const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');

const { User } = require('../models');

const loginUser = rescue(async (req, res, next) => {
  const { error } = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
  }).validate(req.body);

  if (error) return next(error);

  const { email, password } = req.body;

  const getUser = await User.findOne({ where: { email } });

  if (!getUser || getUser.password !== password) {
 return next({ 
    message: 'Invalid fields', code: 400, 
  }); 
}

  const token = jwt.sign(getUser.email, process.env.JWT_SECRET);

  res.status(200).json({ token });
});

module.exports = { 
  loginUser,
 };
