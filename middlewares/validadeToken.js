const Errors = require('../util/errors');
const Auth = require('../util/auth');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const reqToken = req.headers.authorization;

  if (!reqToken) next(new Errors.MissingToken());

  try {
    const decoded = Auth.validateToken(reqToken);
    const { password, ...user } = await User.findOne({ where: decoded.email });
    req.user = user;
    next();
  } catch (err) {
    next(new Errors.InvalidToken());
  }
};