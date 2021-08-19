const validateName = (name) => name.length < 8;
const validateEmail = (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

const BAD_REQUEST_STATUS = 400;

const validateUser = [
  (req, res, next) => {
    const { displayName } = req.body;
    if (validateName(displayName)) {
      const message = '"displayName" length must be at least 8 characters long';
      return res.status(BAD_REQUEST_STATUS).json({ message });
    }
    next();
  },
  (req, res, next) => {
    const { email } = req.body;
    let message;
    if (!email) {
      message = '"email" is required';
      return res.status(BAD_REQUEST_STATUS).json({ message });
    }
    if (!validateEmail(email)) {
      message = '"email" must be a valid email';
      return res.status(BAD_REQUEST_STATUS).json({ message });
    }
    next();
  },
  (req, res, next) => {
    const { password } = req.body;
    let message;
    if (!password) {
      message = '"password" is required';
      return res.status(BAD_REQUEST_STATUS).json({ message });
    }
    if (password.length < 6) {
      message = '"password" length must be 6 characters long';
      return res.status(BAD_REQUEST_STATUS).json({ message });
    }
    next();
  },
];

module.exports = {
  validateUser,
};
