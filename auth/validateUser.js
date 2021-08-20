const Joi = require('joi');

const { Users } = require('../models');

// const BAD_REQUEST_STATUS = 400;
const CONFLICT_ERROR = {
  status: 409,
  message: 'User already registered',
};

const userSchema = Joi.object().keys({
  displayName: Joi.string().min(8).not().empty()
    .required(),
  email: Joi.string().not().empty().email()
    .required(),
  password: Joi.string().length(6).not()
    .empty()
    .required(),
  image: Joi.string(),
});

const verifyIfEmailAlreadyExists = async (email) => {
  const emailAlreadyExists = await Users.findOne({ where: { email } });
  return emailAlreadyExists;
};

const validateUserFields = async (req, res, next) => {
  const newUser = req.body;
  const { error } = userSchema.validate(newUser);

  const emailAlreadyExists = await verifyIfEmailAlreadyExists(req.body.email);
  if (emailAlreadyExists) throw CONFLICT_ERROR;

  if (error) {
    return next(error);
    // return res.status(BAD_REQUEST_STATUS).json({
    //   message: error.details[0].message,
    // });
  }
  return next();
};

module.exports = validateUserFields;
