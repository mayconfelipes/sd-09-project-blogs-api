const { JWTError } = require('../errors');
const tokens = require('../tokens');
const { User } = require('../models');

module.exports = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new JWTError('Token not found');

    const { iat, exp, ...payload } = tokens.access.verify(token);

    const user = await User.findOne({ where: { ...payload } });

    if (!user) throw new JWTError('Expired or invalid token');

    const { password, ...userData } = user.dataValues;
    req.user = userData;

    return next();
  } catch (err) {
    return next(err);
  }
};
