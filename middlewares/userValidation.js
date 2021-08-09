/* regex padrao gabarito / stack */
const validateEmailRegex = (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

const nameDisVal = (displayName) => {
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

const emailIsValid = (email) => {
  if (!email) {
    return '"email" is required';
  }

  if (!validateEmailRegex(email)) {
    return '"email" must be a valid email';
  }

  return false;
};

const valUser = (req, res, next) => {
  const { nameDis, email, password } = req.body;

  const validation = nameDisVal(nameDis) || validatePassword(password)
    || emailIsValid(email) || false;

  if (validation) {
    return res.status(400).json({ message: validation });
  }
  
  next();
};

module.exports = { valUser };
