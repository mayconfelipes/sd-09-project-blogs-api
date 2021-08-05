const validations = require('./validations');
const jwt = require('../auth/jwt');

const { User } = require('../models');

const invalidFieldError = (message) => ({ error: { name: 'invalidField', message } });

const fieldsValidation = ({ email, password }) => {
  const emailValid = validations.emailValidation(email);
  if (emailValid.error) return emailValid;
  
  const passwordValid = validations.passwordValidation(password);
  if (passwordValid.error) return passwordValid;
  
  return { error: false };
};

const login = async ({ email, password }) => {
  const fieldsNotValid = await fieldsValidation({ email, password });
  if (fieldsNotValid.error) return fieldsNotValid;

  const user = await User.findOne({ where: { email, password } });
  if (!user) return invalidFieldError('Invalid fields');
  const { password: _, ...userWithoutPassword } = user.dataValues;
  
  const token = jwt.sign({ user: userWithoutPassword });
  return { token };
};

module.exports = {
  login,
};