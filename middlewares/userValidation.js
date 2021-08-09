const validateEmailRegex = (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

const validateDisplayName = (displayName) => {
  if (displayName.length < 8) {
    return '"displayName" length must be at least 8 characters long';
  }

  return false;
};

const validatePassword = (password) => {
  if (!password) {
    return '"password" is required';
  }

  if (password.length < 6) {
    return '"password" length must be 6 characters long';
  }

  return false;
};

const validateEmail = (email) => {
  if (!email) {
    return '"email" is required';
  }

  if (!validateEmailRegex(email)) {
    return '"email" must be a valid email';
  }

  return false;
};

const userValidation = (req, res, next) => {
  const { displayName, email, password } = req.body;

  const validation = validateDisplayName(displayName) || validatePassword(password)
    || validateEmail(email) || false;

  if (validation) {
    return res.status(400).json({ message: validation });
  }
  
  next();
};

module.exports = { userValidation };
/* este projeto tem participação  da trinca de 9: Joao Vitor Joao Pedro */