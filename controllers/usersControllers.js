const rescue = require('express-rescue');
const services = require('../services/usersService');
const userValidate = require('../middlewares/userValidate');
const validateEmail = require('../middlewares/validateEmail');

const createUsers = [
  userValidate,
  validateEmail,
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const userCreate = await services.createUsers({ displayName, email, password, image });
    return res.status(201).json({ token: userCreate });
  }),
];

module.exports = {
  createUsers,
};