const validatePassword = (password) => {
  if (password === '') {
    return '"password" is not allowed to be empty';
  }

  if (!password) {
    return '"password" is required';
  }

  return false;
};

const validateEmail = (email) => {
  if (email === '') {
    return '"email" is not allowed to be empty';
  }

  if (!email) {
    return '"email" is required';
  }

  return false;
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  const validation = validateEmail(email) || validatePassword(password) || false;

  if (validation) {
    return res.status(400).json({ message: validation });
  }
  next();
};

module.exports = { loginValidation };
/* este projeto tem participação  da trinca de 9: Joao Vitor Joao Pedro */