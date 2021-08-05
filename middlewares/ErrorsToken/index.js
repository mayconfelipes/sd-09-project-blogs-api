module.exports = (err, _req, res, _next) => {
  const { message } = err;

  if (message === 'jwt must be provided') {
    return res.status(401).json({ message: 'Token not found' });
  }

  res.status(401).json({ message: 'Expired or invalid token' });
};
