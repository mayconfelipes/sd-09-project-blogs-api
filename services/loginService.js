const { loginSchema } = require('../schemas');
const { Users } = require('../models');

const userExists = async (email) => Users.findOne({ where: { email } });

const validateLogin = async (email, password) => {
  const verifyCredentials = loginSchema.validate({ email, password });

  if (verifyCredentials.error) return verifyCredentials;

  const userAlreadyExists = await userExists(email);

  if (!userAlreadyExists) {
    return {
      message: 'Invalid fields',
      statusCode: 400,
      error: true,
    };
  }

  return true;
};

module.exports = {
  validateLogin,
};
