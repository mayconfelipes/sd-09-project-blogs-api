const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const loginService = async (email, password) => {
  const user = await Users.findOne({ where: { email, password } });
  if (!user) {
    const error = {
      code: 400,
      message: 'Invalid fields',
    };
    throw error;
  }

  const userObj = {
    id: user.dataValues.id,
    name: user.dataValues.displayName,
    email: user.dataValues.email,
  };

  const token = jwt.sign(userObj, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = loginService;
