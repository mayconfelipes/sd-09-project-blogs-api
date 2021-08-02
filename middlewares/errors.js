module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(400).json({
      message: err.details[0].message,
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    error: {
      message: `Internal server error: ${err.message}`,
    },
  });
};