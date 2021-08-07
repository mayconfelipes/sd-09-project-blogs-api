require('dotenv').config();
const jwt = require('jsonwebtoken');

const {
  emailVerification,
  passwordVerification,
  invalidFieldsVerification,
} = require('../verifications/loginVerifications');

const loginDataValidate = async ({ email, password }) => {
  const emailVerificationError = emailVerification(email);
  if (emailVerificationError.error) return emailVerificationError;

  const passwordVerificationError = passwordVerification(password);
  if (passwordVerificationError.error) return passwordVerificationError;

  const invalidFieldsVerificationError = await invalidFieldsVerification({ email, password });
  if (invalidFieldsVerificationError.error) return invalidFieldsVerificationError;

  return { error: false };
};

const jwtCreator = (userInfos) => {
  const { displayName, email, image } = userInfos;
  const secret = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({
    displayName,
    email,
    image,
  }, secret, jwtConfig);
  return token;
};

const loginUser = async ({ displayName, email, password }) => {
  const loginDataError = await loginDataValidate({ email, password });
  if (loginDataError.error) return loginDataError;
  const token = jwtCreator({ displayName, email, password });

  return { token };
};

module.exports = {
  loginUser,
};
