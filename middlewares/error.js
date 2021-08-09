module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(400).json({ message: err.message });
  }

  if (err.isBoom) {
    const { payload } = err.output;
    return res.status(payload.statusCode).json({ message: payload.message });
  }

  console.error(err);

  return res.status(500).json({
    error: {
      message: `Internal server error: ${err.message}`,
    },
  });
};
