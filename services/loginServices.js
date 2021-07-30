const { User } = require('../models');
const { joiError, LoginSchema, validateError } = require('../schemas/validateError');

const login = async (body) => {
  const { email, password } = body;
  const { error } = LoginSchema.validate({ email, password });
  if (error) throw joiError(400, error);

  const [user] = await User.findAll({
    where: { email },
  });
  if (!user || user.password !== password) throw validateError(400, 'Invalid fields');

  return user;
};

module.exports = {
  login,
};
