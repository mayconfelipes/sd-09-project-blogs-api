const jwt = require('jsonwebtoken');
const { User } = require('../models');

const {
  displayNameVerification,
  emailVerification,
  emailAlreadyExists,
  passwordVerification,
} = require('../middlewares/userVerifications');

const jwtCreator = (userInfos) => {
  const { displayName, email, image } = userInfos;
  const secret = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '30m',
    algorithm: 'HS256',
  };
  const token = jwt.sign({
    displayName,
    email,
    image,
  }, secret, jwtConfig);

  return token;
};

const userDataValidate = async ({ displayName, email, password }) => {
  const displayNameError = displayNameVerification(displayName);
  if (displayNameError.error) return displayNameError;

  const emailVerificationError = emailVerification(email);
  if (emailVerificationError.error) return emailVerificationError;
  const emailAlreadyExistsError = await emailAlreadyExists(email);
  if (emailAlreadyExistsError.error) return emailAlreadyExistsError;

  const passwordVerificationError = passwordVerification(password);
  if (passwordVerificationError.error) return passwordVerificationError;

  return { error: false };
};

const createNewUser = async (userInfos) => {
  const { displayName, email, password, image } = userInfos;
  const userDataError = await userDataValidate(userInfos);
  if (userDataError.error) return userDataError;
  await User.create({
    displayName,
    email,
    password,
    image,
  });
  const token = jwtCreator(userInfos);

  return { token };
};

module.exports = {
  createNewUser,
};
