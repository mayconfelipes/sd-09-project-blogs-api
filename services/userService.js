require('dotenv/config');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const status = require('./statusCode');

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '2h', algorithm: 'HS256' };

function objectError(code, message) {
  return { status: status[code], message };
}

async function findUsers() {
  const users = await Users.findAll(
    { attributes: ['id', 'displayName', 'email', 'image'] },
  );
  return users;
}

async function findOneUser(id) {
  const user = await Users.findOne(
    { attributes: ['id', 'displayName', 'email', 'image'], where: { id } },
  );
  if (!user) return objectError('notFound', 'User does not exist');
  return user;
}

function verifyDisplayName(name) {
  const errorMsg1 = '"displayName" length must be at least 8 characters long';
  if (name.length < 8) return objectError('badRequest', errorMsg1);
  return false;
}

function verifyEmail(email) {
  const errorMsg1 = '"email" is not allowed to be empty';
  const errorMsg2 = '"email" is required';
  const errorMsg3 = '"email" must be a valid email';
  const validRegexEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
  if (email === '') return objectError('badRequest', errorMsg1);
  if (!email) return objectError('badRequest', errorMsg2);
  if (!validRegexEmail.test(email)) return objectError('badRequest', errorMsg3);
  return false;
}

function verifyPassword(password) {
  const errorMsg1 = '"password" is not allowed to be empty';
  const errorMsg2 = '"password" is required';
  const errorMsg3 = '"password" length must be 6 characters long';
  const validRegexPassword = /[\S]{6,}/;
  if (password === '') return objectError('badRequest', errorMsg1);
  if (!password) return objectError('badRequest', errorMsg2);
  if (!validRegexPassword.test(password)) return objectError('badRequest', errorMsg3);
  return false;
}

function userObjectValidator(displayName, email, password) {
  const displayNameVerified = verifyDisplayName(displayName);
  const emailVerifiedError = verifyEmail(email);
  const passwordVerifiedError = verifyPassword(password);
  if (displayNameVerified) return displayNameVerified;
  if (emailVerifiedError) return emailVerifiedError;
  if (passwordVerifiedError) return passwordVerifiedError;
  return {};
}

async function postUser(displayName, email, password, image) {
  const errorMsg1 = 'User already registered';
  const userExists = await Users.findOne({ where: { email } });
  if (userExists) return objectError('conflict', errorMsg1);
  const userCreated = await Users.create({ displayName, email, password, image });
  return userCreated;
}

function loginObjectValidator(email, password) {
  const emailVerifiedError = verifyEmail(email);
  const passwordVerifiedError = verifyPassword(password);
  if (emailVerifiedError) return emailVerifiedError;
  if (passwordVerifiedError) return passwordVerifiedError;
  return {};
}

async function loginExistsValidator(email) {
  const errorMsg1 = 'Invalid fields';
  const userExists = await Users.findOne(
    { attributes: ['id', 'displayName', 'email', 'image'], where: { email } },
  );
  if (!userExists) return objectError('badRequest', errorMsg1);
  return userExists;
}

function tokenGenerator(id, displayName, email, image) {
  const userObject = { id, displayName, email, image };
  const token = jwt.sign(userObject, secret, jwtConfig);
  return { token };
}

function tokenDecoder(token) {
  try {
    const tokenDecoded = jwt.verify(token, secret);
    return tokenDecoded;
  } catch (error) {
    return objectError('unauthorized', 'Expired or invalid token');
  }
}

function tokenValidator(token) {
  try {
    if (!token) throw objectError('unauthorized', 'Token not found');
    const decoded = tokenDecoder(token);
    if (decoded.message) throw decoded;
    return decoded;
  } catch (error) {
    return error;
  }
}

module.exports = {
  findUsers,
  findOneUser,
  userObjectValidator,
  postUser,
  loginObjectValidator,
  loginExistsValidator,
  tokenGenerator,
  tokenValidator,
};