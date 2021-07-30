const JOI = require('joi');
const { Users } = require('../../models');
const response = require('./responseCodes');

const genError = (errorCode, message) => ({
  errorCode,
  message,
});

const USER_SCHEMA = JOI.object({
  displayName: JOI.string().min(8),
  email: JOI.string().email().required(),
  password: JOI.string().length(6).required(),
  image: JOI.string(),
});

const userDetails = (req, _res, next) => {
  const userInfo = req.body;
  const userIsValid = USER_SCHEMA.validate(userInfo);
  if (userIsValid.error) {
    return next(genError(response.BAD_REQUEST, userIsValid.error.details[0].message));
  }
  return next();
};

const userIsNew = async (req, res, next) => {
  const { email } = req.body;
  const userExists = await Users.findOne({ where: { email } });
  if (userExists) return next(genError(response.CONFLICT, 'User already registered'));
  return next();
};

module.exports = {
  userDetails,
  userIsNew,
};