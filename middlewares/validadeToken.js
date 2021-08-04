const Errors = require('../util/errors');
const Auth = require('../util/auth');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const reqToken = req.headers.authorization;

  if (!reqToken) next(new Errors.MissingToken());

  try {
    const decoded = Auth.validateToken(reqToken);
    const user = await User.findOne({ where: { email: decoded.email } });
    const { password, ...userWithoutPassword } = user.dataValues;
    req.user = userWithoutPassword;
    next();
  } catch (err) {
    next(new Errors.InvalidToken());
  }
};