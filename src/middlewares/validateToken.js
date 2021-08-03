const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) return next({ error: { statusCode: 401, message: 'Token not found' } });

  try {
    const decode = jwt.verify(token, jwtSecret);

    req.userId = decode.id;
    req.userImage = decode.image;
  } catch (error) {
    return next({
      error: {
        statusCode: 401,
        message: 'Expired or invalid token',
      },
    });
  }

  next();
};
