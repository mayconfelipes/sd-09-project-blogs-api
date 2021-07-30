const errorMiddleware = (err, req, res, _next) => {
  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }
  console.log(err);
  res.status(500)
    .json({ error: { code: 'internal', message: 'Internal server error' } });
};

module.exports = errorMiddleware;
