const userService = require('../services/userService');
const status = require('../services/statusCode');

const loginObjectValidator = (req, _res, next) => {
  try {
    const { email, password } = req.body;
    const data = userService.loginObjectValidator(email, password);
    if (data.message) throw data;
    return next();
  } catch (error) {
    return next(error);
  }
};

const loginExistsValidator = async (req, _res, next) => {
  try {
    const { email } = req.body;
    const data = await userService.loginExistsValidator(email);
    req.body = data.dataValues;
    if (data.message) throw data;
    return next();
  } catch (error) {
    return next(error);
  }
};

const tokenGenerator = async (req, res, next) => {
  try {
    const { id, displayName, email, image } = req.body;
    const data = userService.tokenGenerator(id, displayName, email, image);
    return res.status(status.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

const tokenValidator = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    const data = userService.tokenValidator(authorization);
    if (data.message) throw data;
    req.body.userLoged = data;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  loginObjectValidator,
  loginExistsValidator,
  tokenGenerator,
  tokenValidator,
};