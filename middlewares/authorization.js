const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtNotFound = {
  error: {
    code: 'jwtNotFound',
    message: 'Token not found',
  },
};

const jwtInvalid = {
  error: {
    code: 'jwtInvalid',
    message: 'Expired or invalid token',
  },  
};

const authorization = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) throw jwtNotFound;

  const userData = jwt.verify(token, secret, (err, decoded) => {
    if (err) throw jwtInvalid;
    return decoded.userInfo;
  });
  req.user = userData;
 
  return next();
};

module.exports = authorization;