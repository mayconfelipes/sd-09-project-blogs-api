const response = require('./response');

const validateName = (name) => typeof name === 'string' && name.length >= 8;

const validatePassword = (password) => {
  if (!password) return '"password" is required';
  if (password.length !== 6) return '"password" length must be 6 characters long';
  return 'validated';
};

const validateEmail = (email) => {
  const emailPattern = /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm;
  if (!email) return '"email" is required';
  if (!emailPattern.test(email)) return '"email" must be a valid email';
  return 'validated';
};

const validateUser = (displayName, password, email) => {
  if (!validateName(displayName)) {
    return response(400, '"displayName" length must be at least 8 characters long');
  }
  const passwordValidation = validatePassword(password);
  if (passwordValidation !== 'validated') {
    return response(400, passwordValidation);
  }
  const emailValidation = validateEmail(email);
  if (emailValidation !== 'validated') {
    return response(400, emailValidation);
  }
  return {
    status: 200,
    message: 'validated',
  };
};

module.exports = validateUser;