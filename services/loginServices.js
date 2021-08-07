require('dotenv/config');

const jwt = require('jsonwebtoken');
const { validateUserEmail } = require('../middlewares/validateForm');
const { User } = require('../models');

const JWTConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const loginServices = async (data) => {
  const emailExist = await validateUserEmail(data);
  if (!emailExist) throw new Error('Invalid fields');
  const user = await User.findOne({ where: { email: data.email } });
  if (!user || user.password !== data.password) {
    return;  
}

const login = {
  id: user.id,
  email: user.email,
};

const token = jwt.sign(login, process.env.JWT_SECRET, JWTConfig);
  return { token }; 
};

module.exports = loginServices;