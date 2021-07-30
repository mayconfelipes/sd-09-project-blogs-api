const joi = require('joi');
const { User } = require('../models');

// const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
// email: joi.string().pattern(emailRegex).required(),

const verifyUserInfos = (infos) => (
  joi.object({
    displayName: joi.string().min(8).required(),
    email: joi.string().email().required(),
    password: joi.string().length(6).required(),
    image: joi.string().required(),
  }).validate(infos)
);

module.exports = async (req, res, next) => {
  const { body: { displayName, email, password, image } } = req;
  const { error } = verifyUserInfos({ displayName, email, password, image });
  if (error) return next(error);

  // const { body: { email } } = req;
  try {
    const result = await User.findOne({ where: { email } });
    if (result) {
      return next({
        statusCode: 409,
        message: 'User already registered',
      });
    }
    return next();
  } catch (e) {
    return next(e);
  }
};
