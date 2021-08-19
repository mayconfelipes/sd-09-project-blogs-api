const BAD_REQUEST_STATUS = 400;

const validateLogin = [
  (req, res, next) => {
    const { email } = req.body;
    let message;
    if (!email && email !== '') {
      message = '"email" is required';
      return res.status(BAD_REQUEST_STATUS).json({ message });
    }
    if (email.length < 1) {
      message = '"email" is not allowed to be empty';
      return res.status(BAD_REQUEST_STATUS).json({ message });
    }
    next();
  },
  (req, res, next) => {
    const { password } = req.body;
    let message;
    if (!password && password !== '') {
      message = '"password" is required';
      return res.status(BAD_REQUEST_STATUS).json({ message });
    }
    if (password.length < 1) {
      message = '"password" is not allowed to be empty';
      return res.status(BAD_REQUEST_STATUS).json({ message });
    }
    next();
  },
];

module.exports = {
  validateLogin,
};
