const { checkNewUser, getUser } = require('../services/user');

const newUser = async (req, res, next) => {
  const { body } = req;
  const { error } = checkNewUser(body);
  if (error) return next(error.message);

  const user = getUser(body.email);
  if (user) return res.status(409).json({ message: 'User already registered' });
};

module.exports = { newUser };