const errorMiddleware = (err, req, res, _next) => {
  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }
  res.status(500)
    .json({ error: { code: 'internal', message: 'Internal server error' } });
};

module.exports = errorMiddleware;
