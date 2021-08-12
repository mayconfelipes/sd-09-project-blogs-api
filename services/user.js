/* regras de negócio */
const { User } = require('../models');

const validatesDisplayName = async (request, response, next) => {
  const { displayName } = request.body;
  // console.log(`Imprimindo valor de displayName em user/services ${displayName}`);

  if (displayName.length < 8) {
    return response.status(400).json({ 
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const validateEmail = async (request, response, next) => {
  const { email } = request.body;
  // console.log(`Imprimindo valor de email em user/services ${email}`);

  if (email === '' || !email) {
    return response.status(400).json({ message: '"email" is required' });
  }
  next();
};

const validateEmailFormat = async (request, response, next) => {
  const { email } = request.body;
  // console.log(`Imprimindo valor de email em user/services ${email}`);
  const regex = /\S+@\S+\.\S+/;

  if (!regex.test(email)) {
    return response.status(400).json({ message: '"email" must be a valid email' });
  }
  next();
};

const validatePassword = async (request, response, next) => {
  const { password } = request.body;
  // console.log(`Imprimindo valor de email em user/services ${email}`);

  if (password === '' || !password) {
    return response.status(400).json({ message: '"password" is required' });
  }
  next();
};

const validatePasswordLength = async (request, response, next) => {
  const { password } = request.body;
  // console.log(`Imprimindo valor de password em user/services ${password}`);

  if (password.length < 6) {
    return response.status(400).json({ 
      message: '"password" length must be 6 characters long',
    });
  }
  next();
};

const emailAlreadyExists = async (request, response, next) => {
  const { email } = request.body;
  const registeredEmail = await User.findOne({ where: { email } });

  if (registeredEmail) {
    return response.status(409).json({ message: 'User already registered' });
  }
  next();
};

/* Traz todos os usuários do banco */
const listUsers = async () => {
  const users = await User.findAll();
  return users;
};

/* Traz usuário pelo id do banco */
const userById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

module.exports = {
  validatesDisplayName,
  validateEmail,
  validateEmailFormat,
  validatePassword,
  validatePasswordLength,
  emailAlreadyExists,
  listUsers,
  userById,
};