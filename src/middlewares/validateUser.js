const Joi = require('joi');
const UserService = require('../services/UserServices');
const { HTTP_CONFLIT_STATUS, HTTP_BADREQ_STATUS } = require('../helpers/statusProtocoloHTTP');

const schemaValidateUser = Joi.object({
  displayName: Joi.string().required().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).message('{#label} length must be 6 characters long'),
});

const validateDataUser = async (req, _res, next) => {
  const { displayName, email, password } = req.body;
  const validateUser = schemaValidateUser.validate({ displayName, email, password });
  if (validateUser.error) return next({ status: HTTP_BADREQ_STATUS, err: validateUser.error.details[0].message });

  return next();
};

const userExists = async (req, _res, next) => {
  const { email } = req.body;
  const exists = await UserService.findByEmail(email);
  if (exists) return next({ status: HTTP_CONFLIT_STATUS, err: 'User already registered' });

  return next();
};

module.exports = {
  validateDataUser,
  userExists,
};