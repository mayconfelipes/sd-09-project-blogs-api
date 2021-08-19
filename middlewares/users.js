const validateName = (name) => name.length < 8;
const validateEmail = (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

const BAD_REQUEST_STATUS = 400;

const validateUser = [
  (request, response, next) => {
    const { displayName } = request.body;
    if (validateName(displayName)) {
      const message = '"displayName" length must be at least 8 characters long';
      return response.status(BAD_REQUEST_STATUS).json({ message });
    }
    next();
  },
  (request, response, next) => {
    const { email } = request.body;
    let message;
    if (!email) {
      message = '"email" is required';
      return response.status(BAD_REQUEST_STATUS).json({ message });
    }
    if (!validateEmail(email)) {
      message = '"email" must be a valid email';
      return response.status(BAD_REQUEST_STATUS).json({ message });
    }
    next();
  },
  (request, response, next) => {
    const { password } = request.body;
    let message;
    if (!password) {
      message = '"password" is required';
      return response.status(BAD_REQUEST_STATUS).json({ message });
    }
    if (password.length < 6) {
      message = '"password" length must be 6 characters long';
      return response.status(BAD_REQUEST_STATUS).json({ message });
    }
    next();
  },
];

module.exports = {
  validateUser,
};
