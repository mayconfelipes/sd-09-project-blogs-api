require('dotenv').config();
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { User } = require('../models');
const validate = require('../middlewares/validate');

const secret = process.env.JWT_SECRET;

module.exports = {
  validateFields:
  validate(Joi.object({
    displayName: Joi.string().min(8),
    email: Joi.string().email().required(),
    password: Joi.string().required().length(6),
    image: Joi.string(),
  })),

  addUser: async (req, res, next) => {
    try {
      const { displayName, email, password, image } = req.body;

      const userExists = await User.findOne({ where: { email } });
      if (userExists) return next({ statusCode: 409, message: 'User already registered' });

      const newUser = await User.create({ displayName, email, password, image });

      const jwtConfig = { expiresIn: '23h', algorithm: 'HS256' };
      const { password: _, ...withoutPassword } = newUser.dataValues;
      const token = jwt.sign(withoutPassword, secret, jwtConfig);

      return res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  listUser: async (_req, res) => {
    try {
      const userExists = await User.findAll({
        attributes: ['id', 'displayName', 'email', 'image'],
      });

      return res.status(200).json(userExists);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
};
