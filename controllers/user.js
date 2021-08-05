const rescue = require('express-rescue');
const { validateUser, hasDuplicatedEmail } = require('../middlewares/validations');
const userServices = require('../services/user');

const createUser = [
  validateUser,
  hasDuplicatedEmail,
  rescue(async (req, res) => {
    const user = req.body;
    const token = await userServices.user(user);
    return res.status(201).json({ token });
  }),
];

module.exports = { createUser };
