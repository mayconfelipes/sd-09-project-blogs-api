const Joi = require('joi');
const UsersService = require('../services/UsersServices');
const { HTTP_BADREQ_STATUS } = require('../helpers/statusProtocoloHTTP');

const schemaValidateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateDataLogin = async (req, _res, next) => {
  const { email, password } = req.body;
  const validateUser = schemaValidateLogin.validate({ email, password });
  if (validateUser.error) {
    return next({ status: HTTP_BADREQ_STATUS, err: validateUser.error.details[0].message });
  }
  return next();
};

const validateLoginSucess = async (req, _res, next) => {
  const { email, password } = req.body;
  const user = await UsersService.findByLogin(email, password);
  if (!user) return next({ status: HTTP_BADREQ_STATUS, err: 'Invalid fields' });
  // criado para usar para criar o novo token ao logar
  req.user = user;
  return next();
};

module.exports = {
  validateDataLogin,
  validateLoginSucess,
};