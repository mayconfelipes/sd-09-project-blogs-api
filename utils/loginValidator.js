const { User } = require('../models');

const verifyEmail = (email) => {
  if (email === '') {
    return {
      error: {
        code: 400,
        message: '"email" is not allowed to be empty',
      },
    };
  }
  if (!email) {
  return {
      error: {
        code: 400,
        message: '"email" is required',
      },
    }; 
  }
};

const verifyPassword = (password) => {
  if (password === '') {
    return {
      error: {
        code: 400,
        message: '"password" is not allowed to be empty',
      },
    };
  }
  if (!password) {
    return {
      error: {
        code: 400,
        message: '"password" is required',
      },
    };
  }
};

const verifyUser = async (email, password) => {
  const userFromDB = await User.findOne({ where: { email, password } });
  if (!userFromDB) {
    return {
      error: {
        code: 400,
        message: 'Invalid fields',
      },
    };
  }
  return userFromDB.toJSON();
};

const loginValidator = async (email, password) => {
  const emailValidation = verifyEmail(email);
  const passwordValidation = verifyPassword(password);
  
  if (emailValidation) return emailValidation;
  if (passwordValidation) return passwordValidation;
  const userValidation = await verifyUser(email, password);
  if (userValidation.error) return userValidation;
  return {
    displayName: userValidation.displayName,
    email: userValidation.email,
  };
};

module.exports = loginValidator;