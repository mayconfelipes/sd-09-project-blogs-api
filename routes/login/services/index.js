const { generateToken } = require('../../../utils/token');
const Models = require('../../user/models/user');

const emptyFields = ({ email, password }) => {
  if (email === '') {
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'emailEmpty' };
  }
  if (password === '') {
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'passwordEmpty' };
  }
};

const existsFields = ({ email, password }) => {
  if (!email) {
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'nonexistentEmail' };
  }

  if (!password) {
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'nonexistentPassword' };
  }
};

const verifyLogin = ({ email, password }) => {
  const invalidLogin = emptyFields({ email, password });
  if (invalidLogin) return invalidLogin;

  const nonexistentFields = existsFields({ email, password });
  if (nonexistentFields) return nonexistentFields;
};

const login = async (credentials) => {
  const validUser = verifyLogin(credentials);
  if (validUser) return validUser;

  const user = await Models.getUserByField('email', credentials.email);

  if (!user) {
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'credentials' };
  }

  if (user.password !== credentials.password) {
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'credentials' };
  }
  
  try {
    const token = generateToken({ email: user.email, password: user.password });
    return { token };
  } catch (error) {
    return { error: true, message: error };
  }
};

module.exports = {
  login,
};
