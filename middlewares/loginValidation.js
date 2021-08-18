// buscar usuario por email e comparar as senhas
// verifica se email está cadasrado
const Joi = require('joi');
const { validateExistingUser } = require('./userValidation');
const { getUserByData } = require('./users');

const checkLoginData = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .messages({ 'email.required': '"email" is required' }),
  password: Joi.string()
    .min(6)
    .max(6)
    .required()
    .messages({
      'string.min': '"password" length must be 6 characters long',
      'string.max': '"password" length must be 6 characters long',
    }),
});

const isPasswordCorrect = async (loginData) => {
  const userData = await getUserByData('email', loginData.email);

  if (userData.password !== loginData.password || !userData) {
    return { status: 401, message: 'Invalid fields' };
  }

  return null;
};

const validateLoginData = (loginData) => {
  const { error } = checkLoginData.validate(loginData);
  if (error) return { status: 400, message: error.message };
  return null;
};

const isUserValid = async (loginData) => {
  const invalidData = validateLoginData(loginData);
  if (invalidData) return invalidData;

  const isUserRegistered = await validateExistingUser(loginData.email);
  if (!isUserRegistered) return { status: 400, message: 'Invalid fields' };

  const incorrectPassword = await isPasswordCorrect(loginData);
  if (incorrectPassword) return incorrectPassword;

  return null;
};

module.exports = {
  isUserValid,
};
