const JOI = require('joi');
const jwt = require('jsonwebtoken');
const { Users } = require('../../models');
const response = require('./responseCodes');

const genError = (errorCode, message) => ({
  errorCode,
  message,
});

const USER_SCHEMA = JOI.object({
  displayName: JOI.string().min(8),
  email: JOI.string().email().required(),
  password: JOI.string().length(6).required(),
  image: JOI.string(),
});

const userDetails = (req, _res, next) => {
  const userInfo = req.body;
  const userIsValid = USER_SCHEMA.validate(userInfo);
  if (userIsValid.error) {
    return next(genError(response.BAD_REQUEST, userIsValid.error.details[0].message));
  }
  return next();
};

const userIsNew = async (req, res, next) => {
  const { email } = req.body;
  const userExists = await Users.findOne({ where: { email } });
  if (userExists) return next(genError(response.CONFLICT, 'User already registered'));
  return next();
};

const userExists = async (req, res, next) => {
  const { email } = req.body;
  const userIsRegistered = await Users.findOne({ where: { email } });
  if (!userIsRegistered) return next(genError(response.BAD_REQUEST, 'Invalid fields'));
  return next();
};

const authUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email, password } });

  if (!user) return res.status(response.BAD_REQUEST).json({ message: 'Campos inválidos' });

  return next();
};

const loginInfo = (req, _res, next) => {
  const { email, password } = req.body;
  const loginIsValid = USER_SCHEMA.validate({ email, password });

  if (loginIsValid.error) {
    return next(genError(response.BAD_REQUEST, loginIsValid.error.details[0].message));
  }

  return next();
};

module.exports = {
  userDetails,
  userIsNew,
  userExists,
  loginInfo,
  authUser,
};