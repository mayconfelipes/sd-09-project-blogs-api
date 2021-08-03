const response = require('./response');

const validatePassword = (password) => {
  if (password === '') return '"password" is not allowed to be empty';
  if (!password) return '"password" is required';
  return 'ok';
};

const validateEmail = (email) => {
  if (email === '') return '"email" is not allowed to be empty';
  if (!email) return '"email" is required';
  return 'ok';
};

const validateLogin = (email, password) => {
  const passwordValidation = validatePassword(password);
  if (passwordValidation !== 'ok') return response(400, passwordValidation);

  const emailValidation = validateEmail(email);
  if (emailValidation !== 'ok') return response(400, emailValidation);

  return {
    status: 200,
    message: 'ok',
  };
};

module.exports = validateLogin;