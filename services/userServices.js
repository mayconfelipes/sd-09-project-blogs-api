const { User } = require('../models');

const {
  displayNameVerification,
  emailVerification,
  emailAlreadyExists,
  passwordVerification,
} = require('../verifications/userVerifications');

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
  const userWithNoPassword = userInfos;
  delete userWithNoPassword.password;

  return userWithNoPassword;
};

module.exports = {
  createNewUser,
};
