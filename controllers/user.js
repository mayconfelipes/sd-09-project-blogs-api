const rescue = require('express-rescue');
const { validateUser, hasDuplicatedEmail } = require('../middlewares/validations');
const userServices = require('../services/user');

const createUser = [
  validateUser,
  hasDuplicatedEmail,
  rescue(async (req, res) => {
    const token = await userServices.user(req.body);
    return res.status(201).json({ token });
  }),
];

module.exports = { createUser };
