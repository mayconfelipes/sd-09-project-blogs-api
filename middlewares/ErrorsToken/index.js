module.exports = (err, _req, res, next) => {
  const { message } = err;

  if (message === 'jwt must be provided') {
    return res.status(401).json({ message: 'Token not found' });
  }

  if (message === 'invalid token' || message === 'jwt malformed') {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next(err);
};
