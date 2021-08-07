const { User } = require('../models');

const invalidFieldObject = (message) => ({ error: true, status: 400, message });

const emailVerification = (email) => {
  if (email === '') return invalidFieldObject('"email" is not allowed to be empty');
  if (!email) return invalidFieldObject('"email" is required');
  return { error: false };
};

const passwordVerification = (password) => {
  if (password === '') return invalidFieldObject('"password" is not allowed to be empty');
  if (!password) return invalidFieldObject('"password" is required');
  return { error: false };
};

const invalidFieldsVerification = async (loginInfos) => {
  const { email, password } = loginInfos;
  const foundUser = await User.findOne({
    where: { email, password },
  });
  if (!foundUser) return invalidFieldObject('Invalid fields');
  return { error: false };
};

module.exports = {
  emailVerification,
  passwordVerification,
  invalidFieldsVerification,
};
