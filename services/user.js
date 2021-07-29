const { User } = require('../models');
const { status, message } = require('./statusMessages');

const userCheck = (req, res, next) => {
  const { displayName, password } = req.body;
  // displayname
  const displayNameCheck = displayName.length >= 8;
  if (!displayNameCheck) {
    return res.status(status.BAD_REQUEST).json(message.displaynameLength);
  }
  // password
  if (!password) {
    return res.status(status.BAD_REQUEST).json(message.passwordRequired);
  }
  if (password === '') {
    return res.status(status.BAD_REQUEST).json(message.passwordEmpty);
  }
  const passwordCheck = password.length >= 6;
  if (!passwordCheck) {
    return res.status(status.BAD_REQUEST).json(message.passwordLength);
  }
  return next();
};

const emailCheck = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(status.BAD_REQUEST).json(message.emailRequired);
  }
  if (email === '') {
    return res.status(status.BAD_REQUEST).json(message.emailEmpty);
  }
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const emailCheckRegex = emailRegex.test(email);
  if (!emailCheckRegex) {
    return res.status(status.BAD_REQUEST).json(message.emailInvalid);
  }
  const emailFind = await User.findOne({ where: { email } });
  if (emailFind) {
    return res.status(status.CONFLICT).json(message.userAlredyRegistered);
  }
  return next();
};

const userCreate = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const result = await User.create({ displayName, email, password, image });
  req.userCreated = result;
  return next();
};

module.exports = { userCheck, emailCheck, userCreate };