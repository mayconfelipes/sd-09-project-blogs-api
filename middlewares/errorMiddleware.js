module.exports = (err, _req, res, _next) => {
  return res.status(500).json({
    error: {
      message: `Internal server error: ${err.message}`,
    },
  });
};
