const { generateToken } = require('../../../utils/token');
const { validName, validEmail, validPassword } = require('../../../utils/validates');
const Models = require('../models/user');

const validateUser = ({ displayName, email, password }) => {
  switch (false) {
  case validName(displayName):
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'invalidName' };
  case validEmail(email):
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'invalidEmail' };
  case validPassword(password):
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'invalidPassword' };
  default:
    return false;
  }
};

const existsFields = ({ email, password }) => {
  switch (undefined) {
  case email:
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'nonexistentEmail' };
  case password:
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'nonexistentPassword' };
  default:
    return false;
  }
};

const verifyUser = ({ displayName, email, password }) => {
  const nonexistentFields = existsFields({ email, password });
  if (nonexistentFields) return nonexistentFields;

  const invalidUser = validateUser({ displayName, email, password });
  if (invalidUser) return invalidUser;
};

const save = async (user) => {
  const validUser = verifyUser(user);
  if (validUser) return validUser;

  if (await Models.getUserByField('email', user.email)) {
    return { error: true, code: 'STATUS_CONFLICT', message: 'userExists' };
  }
  
  try {
    await Models.saveUser(user);
    return { token: generateToken(user) };
  } catch (error) {
    return { error: true, message: error };
  }
};

const all = async () => {
  const users = await Models.getAll();

  return users;
};

const byId = async (id) => {
  const user = await Models.getUserByField('id', id);

  if (!user) return { error: true, code: 'STATUS_NOT_FOUND', message: 'nonexistentUser' };

  return user;
};

const deleteUser = async (id) => {
  try {
    const deleted = await Models.deleteUser(id); 
    return deleted;
  } catch (error) {
    return { error: true, code: 'STATUS_NOT_FOUND', message: 'nonexistentUser' };
  }
};

module.exports = {
  save,
  all,
  byId,
  deleteUser,
};
