const jwt = require('jsonwebtoken');

const { User } = require('../models');

const {
  SECRET,
  code: { UNAUTHORIZED },
  message: { JWT_ERROR, MISSING_AUTH_TOKEN },
} = require('../utils');

const validateToken = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(UNAUTHORIZED).json({ message: MISSING_AUTH_TOKEN });

  try {
    const userDecoded = jwt.verify(token, SECRET);

    const userGeted = await User.findOne({ where: { email: userDecoded.email } });
    const { password, ...userWithoutPassword } = userGeted;

    req.user = userWithoutPassword;

    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: JWT_ERROR });
  }
};

module.exports = validateToken;
