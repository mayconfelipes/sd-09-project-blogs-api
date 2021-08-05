const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

 const userInexist = {
   error: {
     code: 'userNotFind',
     message: 'User does not exist',
   },
 };

const validateDisplayName = (displayName) => {
  const nameInvalid = {
    error: {
        code: 'displayNameInvalid',
        message: '"displayName" length must be at least 8 characters long',
      },
  };

  if (displayName.length < 8) {
    throw nameInvalid;
}
};

const validateEmail = (email) => {
  const invalidEmail = {
    error: {
      code: 'emailInvalid',
      message: '"email" must be a valid email',
    },
  };
  const emailNull = {
      error: {
        code: 'emailNull',
        message: '"email" is required',
    },
  };
  if (!email) {
    throw emailNull;
  }
  if (!/^[\w.]+@[a-z]+.\w{2,3}$/g.test(email)) {
    throw invalidEmail;
  }
};

const validatePassword = (password) => {
  const passNull = {
    error: {
        code: 'passwordNull',
        message: '"password" is required',
      },
  };
  const invalidPass = {
     error: {
        code: 'passwordInvalid',
        message: '"password" length must be 6 characters long',
      },
  };
  if (!password) {
    throw passNull;
  }
  if (password.length < 6) {
    throw invalidPass;
  }
};

const validateEmailExist = async (email) => {
  const emailExist = await User.findOne({ where: { email } });
  const err = {
    error: {
      code: 'userExist',
      message: 'User already registered',
    },
  };
  if (emailExist) {
    throw err;
  }
};

const createUser = async (displayName, email, password, image) => {
  validateEmail(email);
  validateDisplayName(displayName);
  await validateEmailExist(email);
  validatePassword(password);
  const newUser = await User.create({ displayName, email, password, image });
  delete newUser.dataValues.password;
  const token = jwt.sign({ userInfo: newUser.dataValues }, secret, jwtConfig);
  return token;
};

const listAll = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers;
};

const findUser = async (id) => {
  const getUser = await User.findOne({ where: { id } });
  console.log(getUser);
  if (!getUser) throw userInexist;
  delete getUser.dataValues.password;
  return getUser;
};

module.exports = {
  createUser,
  listAll,
  findUser,
};