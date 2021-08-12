require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const erro = require('../utils/error');

// ------------Create User-------------------------------------------
const verifyIfEmailAlreadyExists = async (email) => {
  const emailToTest = await User.findOne({
    where: {
      email,
    },
  });
  // console.log(email,emailToTest,">>>>>>>>>>>>>>>>>>>")
  return emailToTest;
};

const createUser = async (newUser) => {
  const { email } = newUser;
  const emailAlreadyExists = await verifyIfEmailAlreadyExists(email);

  if (emailAlreadyExists) throw erro.ERROR_EMAIL_AE;

  const userToCreate = await User.create(newUser);
  return userToCreate;
};
// ------------------------------------------------------------------------

// ------------Login-------------------------------------------------------

const secret = 'teste';
const jwtConfig = {
  expiresIn: '6h',
  algorithm: 'HS256',
};

const generateToken = async (user) => {
  // console.log("---------------------------token-----------------------");
  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return { token };
};

const loginService = async ({ email, password }) => {
  // console.log("login service----------",email,"-----------");
  const isUser = await verifyIfEmailAlreadyExists(email);

  // console.log("-------isuser------------",isUser,"-------------------------")
  if (!isUser) throw erro.INVALID_FIELDS;

  const user = await User.findOne({ where: { email, password } });
  // console.log("---------user----------",user,"-------------------------")

  return generateToken(user);
};

// ------------------------------------------------------------------------

module.exports = {
  createUser,
  loginService,
};