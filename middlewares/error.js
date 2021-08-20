const BAD_REQUEST_STATUS = 400;

// EXEMPLO
module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(BAD_REQUEST_STATUS).json({
      error: { message: err.details[0].message },
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: { message: err.message },
    });
  }

  console.error(err);

  return res.status(500).json({
    error: {
      message: `Internal server error: ${err.message}`,
    },
  });
};
