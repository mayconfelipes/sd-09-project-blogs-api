const Joi = require('joi');
const UserService = require('../services/UsersServices');
const {
  HTTP_CONFLIT_STATUS,
  HTTP_BADREQ_STATUS,
  HTTP_NOTFOUND_STATUS,
} = require('../helpers/statusProtocoloHTTP');

const schemaValidateUser = Joi.object({
  displayName: Joi.string().required().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).message('{#label} length must be 6 characters long'),
});

const validateDataUser = async (req, _res, next) => {
  const { displayName, email, password } = req.body;
  const validateUser = schemaValidateUser.validate({
    displayName, email, password,
  });
  if (validateUser.error) {
    return next({ status: HTTP_BADREQ_STATUS, err: validateUser.error.details[0].message });
  }
  return next();
};

const userExists = async (req, _res, next) => {
  const { email } = req.body;
  const exists = await UserService.findByEmail(email);
  if (exists) return next({ status: HTTP_CONFLIT_STATUS, err: 'User already registered' });

  return next();
};

const userIdExists = async (req, res, next) => {
  const { id } = req.params;
  const user = await UserService.findUserById(id);
  if (!user) return next({ status: HTTP_NOTFOUND_STATUS, err: 'User does not exists' });
  // guarda dados do usuario, para evitar acessar banco de dados no next
  req.user = user;
  return next();
};

module.exports = {
  validateDataUser,
  userExists,
  userIdExists,
};