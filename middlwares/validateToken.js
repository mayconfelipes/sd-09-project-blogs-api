const jwt = require('jsonwebtoken');

const SECRET = 'TH!S!S@s3CR3t';

const createErrorMsg = (status, msg) => ({
  status,
  msg,
});

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw new Error();
    console.log(token);
    jwt.verify(token, SECRET);
    next();
  } catch (e) {
    if (!token) return next(createErrorMsg(401, 'Token not found'));
    
    next({ status: 401, msg: 'Expired or invalid token' });
  }
};

module.exports = validateToken;