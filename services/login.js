const { User } = require('../models');
const { status, message } = require('./statusMessages');

const loginCheck = async (req, res, next) => {
  const { email, password } = req.body;
  if (email === '') {
  return res.status(status.BAD_REQUEST).json(message.emailEmpty);
  }
  if (password === '') {
    return res.status(status.BAD_REQUEST).json(message.passwordEmpty);
  }
  if (!password) { 
    res.status(status.BAD_REQUEST).json(message.passwordRequired);
  }
  if (!email) {
    return res.status(status.BAD_REQUEST).json(message.emailRequired);
  }

  return next();
};

const loginFindCheck = async (req, res, next) => {
  const { email, password } = req.body;

const emailFind = await User.findOne({ where: { email } });
if (!emailFind) {
  return res.status(status.BAD_REQUEST).json(message.fieldsInvalid);
}
// console.log(emailFind);
const passwordCheck = (password === emailFind.password);
if (!passwordCheck) {
  return res.status(status.UNAUTHORIEZED).json(message.serverError);
}
req.user = emailFind;
return next();
};

module.exports = { loginCheck, loginFindCheck };