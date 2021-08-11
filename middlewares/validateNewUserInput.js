const validateNewUserInput = (_req, _res, next) => {
  // const { displayName, email, password, image } = req.body;
  console.log('Entrei no validador');
  return next();
};

module.exports = validateNewUserInput;