module.exports = (err, _req, res, _next) => {
  console.log('DEU RUIM', err);
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    error: {
      message: 'Internal server error.',
    },
  });
};
