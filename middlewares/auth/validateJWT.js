require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.readers.authorization;

  if (token) return next({ authError: { message: 'missing auth token', code: 'missingAuth' } });

  const decoded = jwt.verify(token, secret);

  console.log(decoded);
};