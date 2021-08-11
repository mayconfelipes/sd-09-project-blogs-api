const { validateDisplayName, validateEmail, validatePassword } = require('./index');

const validateNewUserInput = (req, _res, next) => {
  const { displayName, email, password } = req.body;
  console.log('Entrei no validador');

  validateDisplayName(displayName);
  validateEmail(email);
  validatePassword(password);

  return next();
};

module.exports = validateNewUserInput;