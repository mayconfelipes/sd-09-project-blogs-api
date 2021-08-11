const { checkNewUser, getUser, createUser } = require('../services/user');

const newUser = async (req, res, next) => {
  const { body } = req;
  const { error } = checkNewUser(body);
  if (error) return next(error.message);

  const user = await getUser(body.email);
  if (user) return res.status(409).json({ message: 'User already registered' });

  const created = await createUser(body);
  if (created.err) return res.status(500).json({ message: created.err.message });

  return req.token;
};

module.exports = { newUser };