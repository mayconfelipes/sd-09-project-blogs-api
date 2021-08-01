const { User } = require('../models');

const conflict = 409;
module.exports = async (req, res, next) => {
  const { email } = req.body;
  const existEmail = await User.findOne({ where: { email } });

  if (existEmail) return res.status(conflict).json({ message: 'User already registered' });

  return next();
};